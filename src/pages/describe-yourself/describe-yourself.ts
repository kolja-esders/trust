import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DescribeYourselfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-describe-yourself',
  templateUrl: 'describe-yourself.html',
})
export class DescribeYourselfPage {

  profileImage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }


  triggerConfirmation() {
    this.navCtrl.push('ProfileOverviewPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescribeYourselfPage');

    this.storage.get('profileImage').then((val) => {
      this.profileImage = val;
    });
  }

}
