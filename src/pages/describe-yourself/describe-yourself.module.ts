import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescribeYourselfPage } from './describe-yourself';

@NgModule({
  declarations: [
    DescribeYourselfPage,
  ],
  imports: [
    IonicPageModule.forChild(DescribeYourselfPage),
  ],
})
export class DescribeYourselfPageModule {}
