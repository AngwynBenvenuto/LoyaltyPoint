import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    ProductDetailPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(ProductDetailPage),
  ],
})
export class ProductDetailPageModule {}
