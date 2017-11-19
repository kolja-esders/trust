import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-describe-yourself',
  templateUrl: 'describe-yourself.html',
})
export class DescribeYourselfPage {

  profileImage: string;
  user = {};
  name: string;
  matches: string[] = [];
  detectedLanguage = null;
  loading = false;
  isRecording = false;
  response = '';
  isDemoMode = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private speechRecognition: SpeechRecognition, private api: Api, private cd: ChangeDetectorRef) {
  }

  triggerConfirmation() {
    this.navCtrl.push('ProfileOverviewPage');
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

  speechInput() {
    if (this.loading) {
      return;
    }
    this.loading = true;

    let options = {
      language: this.detectedLanguage,
      showPopup: false,  // Android only
      showPartial: true // iOS only
    };
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.cd.detectChanges();
      //this.navCtrl.push('SelfiePage');
      console.log(matches);

      this.api.validateSomething(matches[0] as string).subscribe( (response: any) => {
        this.response = JSON.stringify(response, null, 2);
        console.log(response);
        this.storage.set('user', response).then((val) => {
          this.navCtrl.push('ProfileOverviewPage');
        });
        this.loading = false;
      });
    }, errors => {
      console.log(errors);
      //this.navCtrl.push('ProfileOverviewPage');
    });
    this.isRecording = true;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescribeYourselfPage');

    this.storage.get('profileImage').then((val) => {
      this.profileImage = val;
    });

    this.storage.get('user').then((val) => {
      this.user = val;
      this.name = 'name' in this.user ? this.user['name'] : 'Unknown name';
    });

    this.detectedLanguage = navigator.language;
    if (!this.detectedLanguage) {
      this.detectedLanguage = "en-US";
    }

    this.getPermission();
  }

}
