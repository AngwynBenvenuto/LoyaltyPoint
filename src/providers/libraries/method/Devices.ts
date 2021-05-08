import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';
@Injectable()
export class DevicesProvider extends LPApi {
  constructor(http: Http) {
      super(http);
  }

  MemberDevice(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem("session_id"));
    body.append('manufacturer', data.manufacture);
    body.append('model', data.model);
    body.append('serial', data.serial);
    body.append('version', data.version);
    body.append('platform', data.platform);
    body.append('registration_id', data.registration_id);
    //body.append('member_id', data.member_id);
    return this.getHttpRequest("MemberDevices", body);
  }

}
