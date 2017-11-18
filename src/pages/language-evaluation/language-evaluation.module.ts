import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageEvaluationPage } from './language-evaluation';

@NgModule({
  declarations: [
    LanguageEvaluationPage,
  ],
  imports: [
    IonicPageModule.forChild(LanguageEvaluationPage),
    TranslateModule.forChild()
  ],
})
export class LanguageEvaluationPageModule {}
