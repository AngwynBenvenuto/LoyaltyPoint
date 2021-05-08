import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    LPSharedModule,
    IonicPageModule.forChild(RegisterPage),
  ],
})
export class RegisterPageModule {}
