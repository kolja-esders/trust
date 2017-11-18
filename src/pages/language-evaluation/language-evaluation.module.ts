import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguageEvaluationPage } from './language-evaluation';

@NgModule({
  declarations: [
    LanguageEvaluationPage,
  ],
  imports: [
    IonicPageModule.forChild(LanguageEvaluationPage),
  ],
})
export class LanguageEvaluationPageModule {}
