import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoucherDetailPage } from './voucher-detail';
import { LPSharedModule } from '../../shared/LPShared.module';
@NgModule({
  declarations: [
    VoucherDetailPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(VoucherDetailPage),
  ],
})
export class VoucherDetailPageModule {}
