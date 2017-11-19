import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
  streaming: false;
}

@IonicPage()
@Component({
  selector: 'page-video-tutorial',
  templateUrl: 'video-conference.html'
})
export class VideoConferencePage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  streaming = false;
  webrtc = null;

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remotesVideos',
      // immediately ask for camera access
      autoRequestMedia: true
    });
  }

  ionViewDidLoad() {
    // the root left menu should be disabled on the video-conference page

  }

  startStream() {
    this.streaming = true;
    console.log("start stream");
    this.webrtc.joinRoom('13371337');
  }

  stopStream() {
    this.streaming = false;
    console.log("leave stream");
    this.webrtc.leaveRoom('13371337');
  }

}
