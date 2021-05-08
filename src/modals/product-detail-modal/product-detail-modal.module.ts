import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailModal } from './product-detail-modal';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    ProductDetailModal,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(ProductDetailModal),
  ],
})
export class ProductDetailModalModule { }
