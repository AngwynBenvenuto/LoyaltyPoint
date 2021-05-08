import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class LoginProvider extends LPApi {
    constructor(http: Http) {
        super(http);
    }

    Login(data:any) {
        // let body = new FormData();
        // body.append('auth_id', this.getAuthID());
        return this.requestLogin();
    }
}