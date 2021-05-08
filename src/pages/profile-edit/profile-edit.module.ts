import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileEditPage } from './profile-edit';
import { LPSharedModule } from '../../shared/LPShared.module';


@NgModule({
  declarations: [
    ProfileEditPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(ProfileEditPage),
  ],
})
export class ProfileEditPageModule {}
