import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, Platform,
    AlertController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@IonicPage()
@Component({
  selector: 'page-update-app',
  templateUrl: 'update-app.html'
})
export class UpdateApp {
  name:string;
  code:any;
  version:string;
  package:string;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public appVersion: AppVersion) {

  }

  getAppVersion() {
    this.appVersion.getAppName().then(name_app => {
      this.name = name_app;
    });
    this.appVersion.getVersionCode().then(code_app => {
        this.code = code_app;
    });
    this.appVersion.getVersionNumber().then(version_app => {
        this.version = version_app;
    });
    this.appVersion.getPackageName().then(package_app => {
        if(this.platform.is('android')) {
          this.package = package_app;
        } else if(this.platform.is('ios')) {
          this.package = "";
        }
    });
  }

  ionViewDidLoad(){
    if(this.platform.is('cordova')) {
      this.getAppVersion();
      // this.platform.registerBackButtonAction(() => {
      //   this.platform.exitApp();
      // });
    }
  }

  update() {
    if(this.platform.is('ios')) {
      let urlIOS = "itms-apps://itunes.apple.com/apps/";
      window.open(urlIOS+this.package, "_system", 'location=yes');
    } else {
      let urlAndroid = "market://details?id=";
      window.open(urlAndroid+this.package, "_system", 'location=yes');
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  exit() {
    this.platform.exitApp();
  }
}
