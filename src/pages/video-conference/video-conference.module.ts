import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoConferencePage } from './video-conference';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    VideoConferencePage,
  ],
  imports: [
    IonicPageModule.forChild(VideoConferencePage),
    TranslateModule.forChild()
  ],
  exports: [
    VideoConferencePage
  ]
})
export class VideoConferencePageModule { }
