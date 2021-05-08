import { Injectable } from '@angular/core';
import { Http, RequestMethod, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';
import { BaseConfig } from './BaseConfig';

@Injectable()
export abstract class CApi extends BaseConfig {
    constructor(public http: Http) {
        super();
    }

    private getRequest(url: string, requestMethod?: any, body?: any) {
        let max_retries = 3;
        let timeout = 10000;

        return new Promise((resolve, reject) => {
            let requestOptionArgs: RequestOptionsArgs = {
                method: requestMethod,
                body: body
            };

            try {
                this.http.request(url, requestOptionArgs)
                    //add timeout
                    .timeout(timeout)
                    .retryWhen((errors) =>
                        errors.scan( ( errorCount, err ) => {
                            if( errorCount < max_retries && err.name == 'TimeoutError' )
                                return errors.delay(500);
                            throw err;
                        }, 0)
                    )
                    //mapping array handle
                    .map(this.extractData)
                    .catch(this.handleError)
                    .subscribe(data => {
                        resolve(data);
                        console.log(data);
                    }, (e) => {
                        reject(e);
                });
            } catch(e) {
                reject(e);
                
            }
        });
    }

    private getUrl(url, isLanguage) {
        let domain = this.urlDomain();
        let domainURL = "";
        if(isLanguage == true) {
            domainURL = domain + url;
        } else {
            domainURL = domain + "/api/member/" + url;
        }
        return domainURL;
    }

    //handle error & extract data
    protected handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            let body:any = {};
            try {
                body = error.json() || {};
            } catch(e) {}
            
            const err = body.err_code || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            // No internet, probably
            if( error.status == 0 ) {
                console.error(errMsg);
                errMsg = 'Your internet connection is offline. Please connect and hit retry';
            }
        } else {
            errMsg = error.err_message ? error.err_message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
    protected extractData(res: Response) {
        let body = res.json();
        return body || {};
    }



    
    //request API & Language
    protected getHttpRequest(url: string, body?: any) {
        return this.getRequest(this.getUrl(url, false), this.methodRequest(), body);
    }

    protected getHttpLanguage(url: string) {
        return this.getRequest(this.getUrl(url, true), RequestMethod.Get);
    
    }


    
}