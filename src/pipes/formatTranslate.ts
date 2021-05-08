import { Pipe, PipeTransform } from '@angular/core';
import { LPTranslate } from '../providers/LPTranslate';

@Pipe({
  name: 'translate',
  pure: false
})
export class FormatTranslate implements PipeTransform {
  constructor(public utilsTranslate: LPTranslate) {
  }

  transform(value: string) {
    if(value == null)
      return;
      
    return this.utilsTranslate.translate(value);
  }
}
