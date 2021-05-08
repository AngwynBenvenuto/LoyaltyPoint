import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class VerifyEmailProvider extends LPApi {
  constructor(http: Http) {
      super(http);
  }


  MemberRequestVerificationEmail(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    body.append('email', data.email);
    return this.getHttpRequest("MemberRequestVerificationEmail", body);
  }


  MemberVerifyEmail(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    body.append('email', data.email);
    body.append('code', data.otp_code);
    return this.getHttpRequest("MemberVerificationEmail", body);
  }

  

}
