import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

declare var Connection;
export enum ConnectionStatusEnum {
    Online,
    Offline
}

@Injectable()
export class LPConnectivity {
    onDevice: boolean;
    previousStatus:any;
    network: Network;
    constructor(public platform: Platform){
        this.onDevice = this.platform.is('cordova');
    }

    isOnline(): boolean {
        // if(this.onDevice && this.network.connection){
        //     return this.network.connection !== Connection.NONE;
        // } else {
        //     return navigator.onLine; 
        // }
        return navigator.onLine; 
    }

    isOffline(): boolean {
        // if(this.onDevice && this.network.connection){
        //     return this.network.connection === Connection.NONE;
        // } else {
        //     return !navigator.onLine;   
        // }
        return !navigator.onLine;
    }

}