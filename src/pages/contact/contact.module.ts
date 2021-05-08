import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(ContactPage),

  ],
})
export class ContactPageModule {}
