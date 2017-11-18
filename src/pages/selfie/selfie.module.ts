import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfiePage } from './selfie';

@NgModule({
  declarations: [
    SelfiePage,
  ],
  imports: [
    IonicPageModule.forChild(SelfiePage),
    TranslateModule.forChild()
  ],
})
export class SelfiePageModule {}
