import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor() {
  }

  transform(value: string) {
    let defaultLang = localStorage.getItem('language');
    let keyLang = (defaultLang == null ? 'en' : defaultLang);
    let getLang = JSON.parse(localStorage.getItem(keyLang));
    if (getLang == null)
      return value;
    else {
      if (getLang[value] != null) {
        return getLang[value];
      } else {
        return value;
      }
    }
  }
}
