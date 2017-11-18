import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileOverviewPage } from './profile-overview';

@NgModule({
  declarations: [
    ProfileOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileOverviewPage),
  ],
})
export class ProfileOverviewPageModule {}
