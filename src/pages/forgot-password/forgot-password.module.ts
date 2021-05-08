import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPasswordPage } from './forgot-password';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    ForgotPasswordPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(ForgotPasswordPage),
  ],
})
export class ForgotPasswordPageModule {}
