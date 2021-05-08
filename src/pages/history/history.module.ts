import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(HistoryPage),
  ],
})
export class HistoryPageModule {}
