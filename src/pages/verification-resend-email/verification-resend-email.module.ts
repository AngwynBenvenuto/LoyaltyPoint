import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerificationResendEmailPage } from './verification-resend-email';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    VerificationResendEmailPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(VerificationResendEmailPage),
  ],
})
export class VerificationResendEmailPageModule {}
