import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class ForgotPasswordProvider extends LPApi {
  constructor(http: Http) {
      super(http);
  }

  MemberRequestForget(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    body.append('email', data.email);
    return this.getHttpRequest("MemberRequestForget", body);
  }

  MemberForgetPassword(data:any){
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    body.append('email', data.email);
    body.append('new_password', data.new_password);
    body.append('new_confirm', data.new_confirm);
    body.append('otp_code', data.otp_code);
    return this.getHttpRequest("MemberForgetPassword", body);
  }

  

}