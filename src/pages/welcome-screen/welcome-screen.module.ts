import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeScreenPage } from './welcome-screen';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    WelcomeScreenPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(WelcomeScreenPage),
  ],
})
export class WelcomeScreenPageModule {}
