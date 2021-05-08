import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerificationHandphonePage } from './verification-handphone';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    VerificationHandphonePage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(VerificationHandphonePage),
  ],
})
export class VerificationHandphonePageModule {}
