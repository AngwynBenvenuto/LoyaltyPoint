import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class AppInfoProvider extends LPApi {

  constructor(http: Http) {
      super(http);
  }

  MemberAppInfo(data:any) {
    let body = new FormData();
    let session_id = (data.session_id  == null ? window.localStorage.getItem('session_id') : data.session_id);
    body.append('session_id', session_id);
    return this.getHttpRequest("GetInfo", body);
  }
  

}
