import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    // ComponentsModule,
    // PipesModule,
    LPSharedModule,
    IonicPageModule.forChild(LoginPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoginPageModule {}
