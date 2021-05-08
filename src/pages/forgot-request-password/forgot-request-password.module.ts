import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotRequestPasswordPage } from './forgot-request-password';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    ForgotRequestPasswordPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(ForgotRequestPasswordPage),
  ],
})
export class ForgotRequestPasswordPageModule {}
