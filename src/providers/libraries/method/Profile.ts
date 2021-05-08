import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class ProfileProvider extends LPApi {
    constructor(http: Http) {
        super(http);
    }

    MemberGetProfile(data:any) {
        let body = new FormData();
        body.append('session_id', window.localStorage.getItem('session_id'));
        body.append('member_id', data.member_id);  
        return this.getHttpRequest("MemberGetProfile", body);
    }

    MemberUpdateProfile(data:any) {
        let body = new FormData();
        body.append('session_id', window.localStorage.getItem('session_id'));
        body.append('member_id', data.member_id);
        body.append('name', data.name);
        body.append('email', data.email);
        body.append('birthdate', data.tanggal_lahir);
        body.append('city_name', data.kota);
        // body.append('province_id', data.province);
        //body.append('country_phone', data.country_id);
        body.append('phone', data.phone);
        body.append('address', data.address);
        body.append('image_name', data.image_name);
        body.append('image_url', data.image);
        if(data.old_password != null && data.new_password != null) {
            body.append('old_password', data.old_password);
            body.append('new_password', data.new_password);
        }
        return this.getHttpRequest("MemberUpdateProfile", body);
    }

    // MemberChangePassword() {    
    // }
}