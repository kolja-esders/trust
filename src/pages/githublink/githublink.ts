import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Api } from '../../providers/api/api';

/**
 * Generated class for the GithublinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-githublink',
  templateUrl: 'githublink.html',
})
export class GithublinkPage {

  gitHubName: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GithublinkPage');
  }

  pushLink() {
    this.api.evaluateGitHubAccount(this.gitHubName).subscribe( (response) => {
      console.log(response);
    });
  }

}
