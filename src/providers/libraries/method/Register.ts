import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class RegisterProvider extends LPApi {
  constructor(http: Http) {
      super(http);
  }

  MemberRegister(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    body.append('name', data.name);
    body.append('email', data.email);
    body.append('phone', data.phone);
    body.append('password', data.password);
    body.append('confirm_password', data.confirm_password);
    return this.getHttpRequest("MemberRegister", body);
  }

  

}
