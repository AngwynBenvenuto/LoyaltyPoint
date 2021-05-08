import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(NotificationPage),
  ],
})
export class NotificationPageModule {}
