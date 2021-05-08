import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class NotificationProvider extends LPApi {
    constructor(http: Http) {
        super(http);
    }

    MemberNofiticationHistory(data:any) {
        let body = new FormData();
        body.append('session_id', window.localStorage.getItem('session_id'));
        body.append('member_id', data.member_id);
        if(data.page_start != null && data.page_end != null) {
            body.append('page_start', data.page_start);
            body.append('page_end', data.page_end);
        }
        return this.getHttpRequest("MemberNotificationHistory", body);
    }
}