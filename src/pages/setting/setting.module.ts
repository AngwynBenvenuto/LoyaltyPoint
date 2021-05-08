import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPage } from './setting';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(SettingPage),
  ],
})
export class SettingPageModule {}
