import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(ProductPage),
  ],
})
export class ProductPageModule {}
