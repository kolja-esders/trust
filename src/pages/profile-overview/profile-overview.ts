import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfileOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-overview',
  templateUrl: 'profile-overview.html',
})
export class ProfileOverviewPage {

  skills = [];
  name: string;
  country: string;
  age: string;
  user = {};
  evaluated = false;

  profileImage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    // TODO: Mock-Up
    this.skills = [
      {'name': 'Java'},
      {'name': 'GoLang'},
      {'name': 'Python 2.7'},
      {'name': 'Cobol'},
      {'name': 'ASM'},
      {'name': 'Micro Programming'},
    ]
  }

  delete(item) {
    console.log(item);
    let index = this.skills.indexOf(item);
    this.skills.splice(index, 1);
  }

  triggerEvaluation() {
    this.navCtrl.push('LanguageEvaluationPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileOverviewPage');

    this.storage.get('profileImage').then((val) => {
      this.profileImage = val;
    });

    this.storage.get('user').then((val) => {
      console.log(val);
      this.user = val;
      this.name = this.user['name'] || 'Unknown';
      this.age = this.user['age'] || 'Unknown';
      this.country = this.user['place'] || 'Unknown';
    });
  }

}
