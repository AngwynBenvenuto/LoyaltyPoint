import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(AboutPage),

  ],
})
export class AboutPageModule {}
