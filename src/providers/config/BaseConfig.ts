import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { CConfig } from '../network/CConfig';

@Injectable()
export abstract class BaseConfig extends CConfig {
    baseUrl:any;
    methodURL:any;

    //end pointurl
    apiUrl = "http://api.loyalty";
    liveUrl = "http://api.dpcindonesia.com";
   
    constructor() {
        super();   
    }

    //domain
    protected urlDomain() {
        switch(this.getServer()) {
            case 'app':
                this.baseUrl = this.apiUrl+".app.ittron.co.id";
                break;
            case 'dev':
                this.baseUrl = this.apiUrl+".dev.ittron.co.id";
                break;
            case 'staging':
                this.baseUrl = this.apiUrl+".staging.ittron.co.id";
                break;
            case 'live': 
                this.baseUrl = this.liveUrl;
                break;
        }
        return this.baseUrl;
    }
    

    //get method
    protected methodRequest() {
        switch(this.getMethod()) {
            case 'POST':
                this.methodURL = RequestMethod.Post;
                break;
            case 'PUT':
                this.methodURL = RequestMethod.Put;
                break;
            case 'GET':
                this.methodURL = RequestMethod.Get;
                break;
        }
        return this.methodURL;
    }


    //
    protected getAuthID() {
        return this.getAuth();
    }
    

}