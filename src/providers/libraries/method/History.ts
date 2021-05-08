import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class HistoryProvider extends LPApi {
  constructor(http: Http) {
      super(http);
  }


  PointHistory(data:any) {
    let body = new FormData();
    body.append('session_id', window.localStorage.getItem('session_id'));
    body.append('member_id', data.member_id);
    if(data.page_start != null && data.page_end != null) {
      body.append('limit_start', data.page_start);
      body.append('limit_end', data.page_end);
    }
    return this.getHttpRequest("PointHistory", body);
  }
}
