import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropImageModal } from './crop-image';
import { LPSharedModule } from './../../shared/LPShared.module';

@NgModule({
  declarations: [
    CropImageModal,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(CropImageModal),
  ],
})
export class CropImageModalModule {}
