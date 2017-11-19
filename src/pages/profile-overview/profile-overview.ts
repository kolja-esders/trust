import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Api} from '../../providers/api/api';

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
  skills_loaded = false;
  coding_style = {"width": "0%"};
  language_style = {"width": "0%"};
  profileImage: string;
  lang_loaded = false;
  user_loaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private api: Api) {

  }

  delete(item) {
    console.log(item);
    let index = this.skills.indexOf(item);
    this.skills.splice(index, 1);
  }

  triggerEvaluation() {
    this.navCtrl.push('LanguageEvaluationPage');
  }

  ionViewDidEnter() {
    this.lang_loaded = false;
    console.log('ionViewDidLoad ProfileOverviewPage');

    this.storage.get('profileImage').then((val) => {
      this.profileImage = val;
    });

    this.storage.get('all-done').then( (val) => {
      if (!val) {
        return;
      }
    });

    this.storage.get('user').then((val) => {

      console.log(val);
      this.user_loaded = false;
      if (!val) {
        return;
      }
      this.user_loaded = true;
      console.log("CRASH NOW");
      this.user = val;
      this.name = this.user['name'] || 'Unknown';
      this.age = this.user['age'] || 'Unknown';
      this.country = this.user['place'] || 'Unknown';
    });

    this.storage.get('lang').then( (val) => {
      // Mock percentages
      this.lang_loaded = false;
      if (!val) {
        console.log("LANG not found");
        return;
      }
      this.lang_loaded = true;
      let coding_percent = 0.9;
      let language_percent = 0.4;
      this.coding_style = {width: (coding_percent * 100)+"%"};
      this.language_style = {width: (language_percent * 100)+"%"};
    });

    this.storage.get('evaluation').then( (val) => {
      this.skills = [];
      this.skills_loaded = false;
      if (!val) {
        return;
      }
      let skills_unformatted = val["quality"]["tabs"]["languages"];
      for (let skill of skills_unformatted) {
        this.skills.push({name: skill});
      }
      this.skills_loaded = true;
    });

    if (this.user_loaded && this.lang_loaded && this.skills_loaded) {
      this.pushUser();
    }

  }

  pushUser() {

    this.storage.get('user-id').then( (val) => {

      let userId = null;
      let isUpdate = true;
      console.log("Value from storage", val);
      if (!val) {
        console.log("No update, create new user");
        isUpdate = false;
      }
      else {
        userId = val;
        console.log("User available - update");
        console.log("userId is ", userId);
      }

      if (isUpdate) {
        console.log("userId is ", userId);
        this.api.updateUser(
          userId,
          this.user["name"],
          this.user["country"],
          this.user["email"],
          this.skills
        )
          .subscribe((response: any) => {
            console.log(response);
          });
      }
      else {
        this.api.createNewUser(
          this.user["name"],
          this.user["country"],
          this.user["country"],
          this.skills
        )
          .subscribe((response: any) => {
            console.log(response);
            this.storage.set('user-id', response);
          });
      }

    });

  }

}
