import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import { Api } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LanguageEvaluationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-language-evaluation',
  templateUrl: 'language-evaluation.html',
})
export class LanguageEvaluationPage {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguageEvaluationPage');

    this.storage.get('profileImage').then((val) => {
      this.profileImage = val;
    });

    this.detectedLanguage = "de-DE";

    this.storage.get('user').then((val) => {
      console.log(val);
      if (!val) {
        return;
      }
      this.user = val;
      this.name = this.user['name'] || 'Unknown';
    });

    this.getPermission();
  }

  testLanguage() {
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
      console.log(matches);

      this.api.getLanguageQuality(matches[0]).subscribe( (response: any) => {
        this.response = JSON.stringify(response, null, 2);
        console.log(response);
        this.storage.set('lang', response).then((val) => {
          this.navCtrl.push('GithublinkPage');
        });
        this.loading = false;
      });
    }, errors => {
      console.log(errors);
      this.storage.set('lang', 'TESTTESTTEST').then((val) => {
        this.navCtrl.push('GithublinkPage');
      });
    });
    this.isRecording = true;
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

}
