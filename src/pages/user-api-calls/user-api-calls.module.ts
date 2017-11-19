import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserApiCallsPage } from './user-api-calls';

@NgModule({
  declarations: [
    UserApiCallsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserApiCallsPage),
  ],
})
export class UserApiCallsPageModule {}
