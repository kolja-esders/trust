import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';

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

  matches: String[];
  isRecording = false;
  isDemoMode = false;

  constructor(
    public navCtrl: NavController,
    private speechRecognition: SpeechRecognition,
    private plt: Platform,
    private cd: ChangeDetectorRef) {

  }

  ionViewDidLoad() {
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
      language: 'en-US' // TODO: This should be arbitrary...
    };
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
