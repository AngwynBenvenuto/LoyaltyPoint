import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LPApi } from '../LPApi';

@Injectable()
export class CheckVersionProvider extends LPApi {
  constructor(http: Http) {
      super(http);
  }

  MemberCheckVersion() { }

}
