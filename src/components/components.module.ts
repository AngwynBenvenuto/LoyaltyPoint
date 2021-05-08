import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { BackgroundImage } from './background-image/background-image';
import { PreloadImage } from './preload-image/preload-image';
import { ShowHideContainer } from './show-hide-password/show-hide-container';
import { ShowHideInput } from './show-hide-password/show-hide-input';
import { FaIcon } from './fa-icon/fa-icon';
import { PinCode } from './pin-code/pin-code';
//import { ExpandableHeader } from './expandable-header/expandable-header';

const components = [
  BackgroundImage,
  PreloadImage,
  ShowHideContainer,
  ShowHideInput,
  FaIcon,
  PinCode,
  //ExpandableHeader,

];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    IonicModule
  ],
  exports: [
    components
  ]
})
export class ComponentsModule {}