import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfiePage } from './selfie';

@NgModule({
  declarations: [
    SelfiePage,
  ],
  imports: [
    IonicPageModule.forChild(SelfiePage),
  ],
})
export class SelfiePageModule {}
