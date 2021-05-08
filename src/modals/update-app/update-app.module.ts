import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateApp } from './update-app';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [
        UpdateApp
    ],
    imports: [
      PipesModule,
      IonicPageModule.forChild(UpdateApp),
    ],
  })
  export class UpdateAppModule {}