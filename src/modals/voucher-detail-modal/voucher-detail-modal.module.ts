import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoucherDetailModal } from './voucher-detail-modal';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    VoucherDetailModal,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(VoucherDetailModal),
  ],
})
export class VoucherDetailModalModule { }
