import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsPage } from './terms';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    TermsPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(TermsPage),
  ],
})
export class TermsPageModule {}
