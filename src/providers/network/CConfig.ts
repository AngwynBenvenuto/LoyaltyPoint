import { Injectable } from "@angular/core";

var app_code:number = 991;
var app_themes:any = "beauty"; //theme
var app_name:string = "DPC"; //app name
var app_method:any = "POST"; //method
var app_server:any = "dev"; //app, dev, staging, live (server)
var app_auth_id:any = "f637f34761697e6271b6f5b54f89df5d"; //auth id

@Injectable()
export abstract class CConfig {
    //getter app code
    public getCode() {
        return app_code;
    }
    

    //setter getter name app
    public setName(name:any) {
        app_name = name;
    }
    public getName() {
        return app_name;
    }


    //setter getter themes
    public setTheme(themes:any) {
        app_themes = themes;
    }
    public getTheme() {
        return app_themes;
    }



    //setter getter server
    public setServer(server:any) {
        app_server = server;
    }
    public getServer() {
        return app_server;
    }



    //setter getter method
    public setMethod(method:any) {
        app_method = method;
    }
    public getMethod() {
        return app_method;
    }



    //setter getter auth id
    public setAuth(auth_id:any) {
        if(app_auth_id != auth_id) {
            window.localStorage.clear();
        }
        
        app_auth_id = auth_id;
    }
    public getAuth() {
        return app_auth_id;
    }
    
    /*
    note auth_id
    beauty = 'ce059dc61934a40244fa195727196d60';
    cafe = 'f637f34761697e6271b6f5b54f89df5d'
    laundry = 'abf1c505b9349f8edb09caf47af0639d'
    car = 'c7f5e348311d16c0db64e359ceea384c'
    property = 'c4ab80cc7daf389622e9c25d96ef9fbf'
    professional = '354d16c9d8bc9ffd1dde0bcf12ad35af'
    individual = '6d6ae517fb95896abfae31aa42d7b8d3'
    workshop = '3c60cabe24c1a93dc3830c27621e3ace'
    hotel = 'a2d46857c1bc8b09dd647289dfd041a4'

    */

}