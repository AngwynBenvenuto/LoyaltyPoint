import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromoPage } from './promo';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    PromoPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(PromoPage),
  ],
})
export class PromoPageModule {}
