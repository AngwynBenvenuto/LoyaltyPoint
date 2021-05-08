import { Injectable } from "@angular/core";
import { Platform, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export enum ConnectionStatus {
    Online,
    Offline
}

@Injectable()
export class CConnectivity {
    public onDevice: boolean;
    public previousStatus:any;
    public status: ConnectionStatus;
    private _status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(null);

    constructor(public platform: Platform,
        public network: Network,
        public events: Events){
        this.onDevice = this.platform.is('cordova');
        this.status = ConnectionStatus.Online;
    }

    public initializeNetworkEvents(): void {
        /* OFFLINE */
        this.network.onDisconnect().subscribe(() => {
            if (this.status === ConnectionStatus.Online) {
                this.setStatus(ConnectionStatus.Offline);
                this.previousStatus = ConnectionStatus.Offline;
            }
        })

        /* ONLINE */
        this.network.onConnect().subscribe(() => {
            if (this.status === ConnectionStatus.Offline) {
                this.setStatus(ConnectionStatus.Online);
                this.previousStatus = ConnectionStatus.Online;
            }
        })

    }

    private setStatus(status: ConnectionStatus) {
        this.status = status;
        this._status.next(this.status);
    }


    public getNetworkType(): string {
        return this.network.type;
    }

    public getNetworkStatus(): Observable<ConnectionStatus> {
        return this._status.asObservable();
    }
    
    public isOnline(): boolean {
        if(this.onDevice && this.status){
            return this.previousStatus;
        }
        return navigator.onLine;
    }

    public isOffline(): boolean {
        if(this.onDevice && this.status){
            return this.previousStatus;
        } 
        return !navigator.onLine;
    }

}