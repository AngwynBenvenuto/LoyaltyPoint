import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopUpImageModal } from './popup-image';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    PopUpImageModal,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(PopUpImageModal),
  ],
})
export class PopUpImageModalModule {}
