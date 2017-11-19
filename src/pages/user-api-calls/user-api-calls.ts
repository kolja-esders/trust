import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the UserApiCallsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-api-calls',
  templateUrl: 'user-api-calls.html',
})
export class UserApiCallsPage {

  username: string = "";
  country: string = "";
  email: string = "";
  skills: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api, private storage: Storage) {

  }

  getUser() {
    this.storage.get('user-id').then( (val) => {

      if (!val) {
        console.log("No user id available. abort.");
        return;
      }

      this.api.getUser(val).subscribe( (response) => {
        console.log("User Information", response);
      });

    });
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

      console.log(this.username);
      console.log(this.country);
      console.log(this.email);
      console.log(this.skills.split(',').map(function (e) {
        return e.trim();
      }));

      if (isUpdate) {
        console.log("userId is ", userId);
        this.api.updateUser(
          userId,
          this.username,
          this.country,
          this.email,
          this.skills.split(',').map(function (e) {
            return e.trim();
          })
        )
          .subscribe((response: any) => {
            console.log(response);
          });
      }
      else {
        this.api.createNewUser(
          this.username,
          this.country,
          this.email,
          this.skills.split(',').map(function (e) {
            return e.trim();
          })
        )
          .subscribe((response: any) => {
            console.log(response);
            this.storage.set('user-id', response);
          });
      }

    });

  }

  clearStorage() {
    console.log('Clear storage');
    this.storage.clear();
    this.storage.remove('user-id');
  }

  printId() {
    this.storage.get('user-id').then( (val) => {
      console.log(val);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserApiCallsPage');
  }

}
