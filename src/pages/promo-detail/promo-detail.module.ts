import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromoDetailPage } from './promo-detail';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    PromoDetailPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(PromoDetailPage),
  ],
})
export class PromoDetailPageModule {}
