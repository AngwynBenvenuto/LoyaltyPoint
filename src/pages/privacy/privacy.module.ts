import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyPage } from './privacy';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    PrivacyPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(PrivacyPage),
  ],
})
export class PrivacyPageModule {}
