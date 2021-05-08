import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class CMSProvider extends LPApi {

  constructor(http: Http) {
      super(http);
  }

  //CMS Page
  CMSTermsCondition(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    return this.getHttpRequest("CMSTermsCondition", body);
  }
  
  CMSPrivacyPolicy(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    return this.getHttpRequest("CMSPrivacyPolicy", body);
  }

  CMSAboutUs(data:any){
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    return this.getHttpRequest("CMSAboutUs", body);
  }

  CMSContactUs(data:any){
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    return this.getHttpRequest("CMSContactUs", body);
  }


  
  //CMS Slider
  CMSHome(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    return this.getHttpRequest("CMSHome", body);
  }
}
