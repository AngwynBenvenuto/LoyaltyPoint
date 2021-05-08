import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DatePickerModule } from 'ionic3-datepicker';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

const Shared = [
  PipesModule,
  ComponentsModule,
  DatePickerModule
];

@NgModule({
  declarations: [
   
  ],
  imports: [
    IonicModule,
    Shared
  ],
  exports: [
    Shared

  ]
})

export class LPSharedModule { }