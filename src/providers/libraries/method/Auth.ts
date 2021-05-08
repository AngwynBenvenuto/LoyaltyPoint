import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class AuthProvider extends LPApi {
  constructor(http: Http) {
      super(http);
  }


  MemberLogin(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem("session_id"));
    body.append('email', data.username);
    body.append('password', data.password);
    if(window.localStorage.getItem("cloud_messaging_id") != null) {
      body.append('cloud_messaging_id', window.localStorage.getItem("cloud_messaging_id"));
    }
    return this.getHttpRequest("MemberLogin", body);
  }

  MemberLogout(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    body.append('cloud_messaging_id', window.localStorage.getItem('cloud_messaging_id'));
    return this.getHttpRequest("MemberLogout", body);
  }
}
