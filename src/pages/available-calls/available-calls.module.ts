import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AvailableCallsPage } from './available-calls';

@NgModule({
  declarations: [
    AvailableCallsPage,
  ],
  imports: [
    IonicPageModule.forChild(AvailableCallsPage),
    TranslateModule.forChild()
  ],
  exports: [
    AvailableCallsPage
  ]
})
export class AvailableCallsPageModule { }
