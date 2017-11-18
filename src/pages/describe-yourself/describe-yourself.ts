import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  triggerConfirmation() {
    this.navCtrl.push('WelcomePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescribeYourselfPage');
  }

}
