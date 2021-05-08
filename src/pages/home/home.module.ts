import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
// import { PipesModule } from '../../pipes/pipes.module';
// import { ComponentsModule } from '../../components/components.module';
import { LPSharedModule } from '../../shared/LPShared.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    //KSSwiperModule,
    LPSharedModule,
    // ComponentsModule,
    // PipesModule,
    IonicPageModule.forChild(HomePage),

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomePageModule {}
