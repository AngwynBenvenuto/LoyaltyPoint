import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(TabsPage),

  ],
})
export class TabsPageModule {}
