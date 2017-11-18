import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileOverviewPage } from './profile-overview';

@NgModule({
  declarations: [
    ProfileOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileOverviewPage),
    TranslateModule.forChild()
  ],
})
export class ProfileOverviewPageModule {}
