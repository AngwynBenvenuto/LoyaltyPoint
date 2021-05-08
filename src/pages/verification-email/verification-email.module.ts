import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerificationEmailPage } from './verification-email';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    VerificationEmailPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(VerificationEmailPage),
  ],
})
export class VerificationEmailPageModule {}
