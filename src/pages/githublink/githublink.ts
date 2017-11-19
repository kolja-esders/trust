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
  loading: boolean = false;
  final_rank = null;
  skills = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api, private storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GithublinkPage');
  }

  pushLink() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.api.evaluateGitHubAccount(this.gitHubName).subscribe( (response) => {
      console.log(response);
      this.final_rank = response["rank"]["value"];
      this.skills = response["quality"]["tabs"]["languages"];
      this.storage.set('evaluation', response).then( () => {
        this.loading = false;
      });
    });
  }

}
