import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  }

}
