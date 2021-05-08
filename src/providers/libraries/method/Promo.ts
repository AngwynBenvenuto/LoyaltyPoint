import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class PromoProvider extends LPApi {
    constructor(http: Http) {
        super(http);
    }

    MemberGetPromo(data:any) {
        let body = new FormData();
        body.append('session_id', window.localStorage.getItem('session_id'));
        if(data.page_start != null && data.page_end != null) {
            body.append('limit_start', data.page_start);
            body.append('limit_end', data.page_end);
        }
        return this.getHttpRequest("GetPromo", body);
    }

    MemberGetPromoDetail(data:any) {
        let body = new FormData();
        body.append('session_id', window.localStorage.getItem('session_id'));
        body.append('promo_id', data.promo_id);
        return this.getHttpRequest("GetPromoDetail", body);
    }
}