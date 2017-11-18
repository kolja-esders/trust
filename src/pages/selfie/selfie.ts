import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    y: 78,
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview) {
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

  snap() {
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      // Specify some kind of backup picture
      this.picture = 'assets/img/test.jpg';
    });

    this.navCtrl.push('DescribeYourselfPage');
  }

}
