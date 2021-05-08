import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterSuccessModal } from './register-success';
import { LPSharedModule } from './../../shared/LPShared.module';

@NgModule({
  declarations: [
    RegisterSuccessModal,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(RegisterSuccessModal),
  ],
})
export class RegisterSuccessModalModule {}
