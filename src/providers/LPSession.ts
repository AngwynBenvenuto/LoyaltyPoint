import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class LPSession {
    public user:any;
    public events:Events;
    constructor() {
        if(localStorage.getItem('user')) {
            this.user = JSON.parse(window.localStorage.getItem('user'));
        }
    }

    setUser(session) {
        this.user = session;
        window.localStorage.setItem("user", JSON.stringify(this.user));
    }

    getUser() {
        let userData = this.user;
        return userData;
    }

    isLoggedIn() {
        return this.user ? true : false;
    }
    
    clearUser() {
        this.user = null;
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("list_dependents");
    }
    
}