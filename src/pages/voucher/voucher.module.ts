import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoucherPage } from './voucher';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    VoucherPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(VoucherPage),
  ],
})
export class VoucherPageModule {}
