import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import { Api } from '../../providers/api/api';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  matches: String[] = [];
  isRecording = false;
  isDemoMode = false;
  detectedLanguage = null;
  response = '';
  loading = false;

  constructor(
    public navCtrl: NavController,
    private speechRecognition: SpeechRecognition,
    private plt: Platform,
    private cd: ChangeDetectorRef,
    private api: Api) {
  }

  ionViewDidLoad() {
    this.detectedLanguage = navigator.language;
    if (!this.detectedLanguage) {
      console.log("WARNING: Language could not be detected. Set to 'en-US'");
      this.detectedLanguage = "en-US";
    }
    this.getPermission();
  }

  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      })
      .catch( () => {
        console.log("In Demo Mode");
        this.isDemoMode = true;
      });
  }

  startListening() {
    let options = {
      language: this.detectedLanguage,
      showPopup: false,  // Android only
      showPartial: true // iOS only
    };
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  apiCall() {

    if (this.loading) {
      return;
    }
    this.loading = true;

    setTimeout(() => {
      this.api.validateSomething('').subscribe( (response: any) => {
        this.response = JSON.stringify(response, null, 2);
        this.loading = false;
      })
    }, 500);

    // this.navCtrl.push('SignupPage');
  }

  nextScreen() {
    this.navCtrl.push('SelfiePage');
  }
}
