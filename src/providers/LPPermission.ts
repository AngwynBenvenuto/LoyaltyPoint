import { Injectable } from "@angular/core";
import { LPSession } from './LPSession';

@Injectable()
export class LPPermission {
    public session: LPSession;
    public dataPermission:any;
    constructor() {
        let tempPermission = JSON.parse(this.session.getUser());
        let arrayPermission = tempPermission['Permission'];
        this.dataPermission = arrayPermission;
    }

    havePermission(value:any) {

    }


}
