import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { CApi } from '../config/CApi';

@Injectable()
export class LPApi extends CApi {
    session_id:string;
  
    constructor(public http: Http) {
        super(http);

        this.session_id = window.localStorage.getItem('session_id');
        
    }

    // public requestApi(name:any, formData:any) {
    //     const body = new FormData();
    //     body.append('session_id', this.session_id);
    //     if(formData != null) {
    //         Object.keys(formData).forEach(function(key, index) {
    //             body.append(key, formData[key]);
    //         });
    //     }
    //     return this.getHttpRequest(name, body);
    // }
    
    public requestLogin(){
        const body = new FormData();
        body.append('auth_id', this.getAuthID());
        return this.getHttpRequest("Login", body);
    }
    
}
