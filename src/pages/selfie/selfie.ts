import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';

@IonicPage()
@Component({
  selector: 'page-selfie',
  templateUrl: 'selfie.html',
})
export class SelfiePage {

  picture: string;

  readonly cameraPreviewOpts: CameraPreviewOptions = {
    x: (window.screen.width / 2) - 150,
    y: 50,
    width: 300,
    height: 300,
    camera: 'front',
    tapPhoto: true,
    previewDrag: false,
    toBack: true,
    alpha: 1
  };

  readonly pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelfiePage');

    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  ionViewWillEnter() {
    this.cameraPreview.show();
  }

  ionViewWillLeave() {
    this.cameraPreview.hide();
  }

  snap() {
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.storage.set('profileImage', 'data:image/jpeg;base64,' + imageData).then((val) => {
        this.navCtrl.push('DescribeYourselfPage');
      });
    }, (err) => {
      console.log(err);
      // Specify some kind of backup picture
      this.storage.set('profileImage', '../assets/img/profile.jpg').then((val) => {
        this.navCtrl.push('DescribeYourselfPage');
      });
    });
  }

}
