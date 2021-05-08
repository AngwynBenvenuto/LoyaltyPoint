import { Injectable } from "@angular/core";

@Injectable()
export class LPTranslate {
    constructor() { }
    
    translate(value: string){
      let defaultLang = localStorage.getItem('language');
      let keyLang = (defaultLang == null ? 'en' : defaultLang);
      let getLang = JSON.parse(localStorage.getItem(keyLang));
      if(getLang == null) 
        return value;
      else {
        if(getLang[value] != null) {
          return getLang[value];
        } else {
          return value;
        }
      }
    }

    get(value: string) {
      return this.translate(value);
    }
}