import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
