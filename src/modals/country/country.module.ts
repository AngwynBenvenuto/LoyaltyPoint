import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Country } from './country';
import { LPSharedModule } from './../../shared/LPShared.module';

@NgModule({
    declarations: [
      Country
    ],
    imports: [
      LPSharedModule,
      IonicPageModule.forChild(Country),
    ],
  })
  export class CountryModule {}