import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class VoucherProvider extends LPApi {
    constructor(http: Http) {
        super(http);
    }

    MemberGetVoucher(data:any) {
        let body = new FormData();
        body.append('session_id', window.localStorage.getItem('session_id'));
        if(data.page_start != null && data.page_end != null) {
            body.append('limit_start', data.page_start);
            body.append('limit_end', data.page_end);
        }
        return this.getHttpRequest("GetVoucher", body);
    }

    MemberGetVoucherDetail(data:any) {
        let body = new FormData();
        body.append('session_id', window.localStorage.getItem('session_id'));
        body.append('voucher_id', data.voucher_id);
        return this.getHttpRequest("GetVoucherDetail", body);
    }
}