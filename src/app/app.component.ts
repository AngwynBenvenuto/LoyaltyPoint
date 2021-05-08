import { Component, ViewChild } from '@angular/core';
import {
  Platform, ModalController, MenuController, Nav, Events, App,
  ToastController
} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { FCM } from '@ionic-native/fcm';
import { AppVersion } from '@ionic-native/app-version';

import { LPSession } from '../providers/LPSession';
import { LPTranslate } from '../providers/LPTranslate';
import { LoginProvider } from '../providers/libraries/method/Login';
import { AppInfoProvider } from '../providers/libraries/method/AppInfo';
import { DevicesProvider } from '../providers/libraries/method/Devices';
import { LP } from '../pages/LP';

@Component({
  templateUrl: 'app.html'
})
export class MyApp extends LP {
  rootPage: any;
  @ViewChild(Nav) navCtrl: Nav;
  dataProfile: any = [];
  placeholder = 'assets/imgs/no-profile.jpg';
  member_id: any;
  allowClose: boolean = false;
  lastBack: any;
  onDevice: any;

  //forceUpdate
  minimumVersion: any;
  iosMinimumVersion: any;

  //theme
  themesName: any;
  selectedTheme: any;
  currentVersion: any;
  urlParameters: any = [];
  auth_id: any;
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public events: Events,
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public app: App,
    public appVersion: AppVersion,
    public device: Device,
    public fcm: FCM,
    public session: LPSession,
    public translate: LPTranslate,
    public loginProvider: LoginProvider,
    public appInfoProvider: AppInfoProvider,
    public deviceProvider: DevicesProvider) {
    super();


    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.loadApp();
      this.platform.registerBackButtonAction(() => {
        const overlay = this.app._appRoot._overlayPortal.getActive();
        const nav = this.app.getActiveNav();
        const closeDelay = 2000;
        const spamDelay = 500;

        if (overlay && overlay.dismiss) {
          overlay.dismiss();
        } else if (nav.canGoBack()) {
          nav.pop();
        } else if (Date.now() - this.lastBack > spamDelay && !this.allowClose) {
          this.allowClose = true;
          let toast = this.toastCtrl.create({
            message: this.translate.get("Tekan 'back' sekali lagi untuk menutup aplikasi"),
            duration: closeDelay,
            dismissOnPageChange: true,
            cssClass: 'toast-material'
          });
          toast.onDidDismiss(() => {
            this.allowClose = false;
          });
          toast.present();
        } else if (Date.now() - this.lastBack < closeDelay && this.allowClose) {
          this.platform.exitApp();
        }
        this.lastBack = Date.now();
      });
    });
  }

  loadApp() {
    this.getDocumentUrlConfig();
    this.getLoginApp();
  }

  getLoginApp() {
    this.loginProvider.Login({}).then(res => {
      let responseSession = res['data']['session_id'];
      localStorage.setItem('session_id', responseSession);
      this.getAppInfo(responseSession);
    }).catch(e => {
      //this.utils.showToast(e);
    })
  }

  getAppInfo(session: any) {
    this.appInfoProvider.MemberAppInfo({ session_id: session }).then(res => {
      let response = res['data'];
      let have_register = response['have_register'];
      let cms_header = response['cms_header'];
      let login_background = response['login_background'];
      this.minimumVersion = response['member_android_min_version'];
      this.iosMinimumVersion = response['member_ios_min_version'];
      window.localStorage.setItem('have_register', have_register);
      window.localStorage.setItem('cms_header', cms_header);
      window.localStorage.setItem('login_background', login_background);

      this.registerFirebase();
      this.registerDevices();
    }).catch(e => {
      //this.utils.showToast(e);
    })
  }

  registerFirebase() {
    if (this.platform.is('cordova')) {
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        window.localStorage.setItem('registration_id', token);
      });
      this.fcm.onNotification().subscribe((data) => {
        if (data.wasTapped) {
          this.handleNotification(data);
        } else {
          let toast = this.toastCtrl.create({
            message: this.translate.get(data.message),
            duration: 2000,
            position: 'top',
            dismissOnPageChange: true,
            cssClass: 'toast-material'
          });
          toast.present();
        };
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        window.localStorage.setItem('registration_id', token);
      });
    }
  }

  handleNotification(data: any) {
  }

  registerDevices(data: any = null) {
    if (this.platform.is('cordova')) {
      let deviceInfo = {
        manufacture: this.device.manufacturer,
        model: this.device.model,
        serial: this.device.serial,
        version: this.device.version,
        platform: this.device.platform,
        registration_id: window.localStorage.getItem('registration_id'),
      }

      this.deviceProvider.MemberDevice(deviceInfo).then(res => {
        if (res['err_code'] == 0) {
          let responseCloudId = res['data'];
          window.localStorage.setItem('cloud_messaging_id', responseCloudId['cloud_messaging_id']);
        }

        this.checkLogin();
        this.updateApp();
        this.splashScreen.hide();

      }).catch(e => {
        console.log(e);
      })
    } else {
      this.checkLogin();
      this.updateApp();
      this.splashScreen.hide();
    }
  }

  checkLogin() {
    let user = this.session.isLoggedIn();
    if (user == true) {
      this.rootPage = 'TabsPage';
    } else {
      this.rootPage = 'LoginPage';
    }
  }

  updateApp() {
    if (this.platform.is('cordova')) {
      this.appVersion.getVersionCode().then(code => {
        this.currentVersion = code;

        let minimum = "";
        if (this.platform.is('android')) {
          minimum = this.minimumVersion;
        } else if (this.platform.is('ios')) {
          minimum = this.iosMinimumVersion;
        }
        console.log(minimum + " " + this.currentVersion);
        if (this.currentVersion < minimum) {
          let modalForceUpdate = this.modalCtrl.create('UpdateApp', {}, {});
          modalForceUpdate.present();
        }
      }).catch(function (error) {
        console.log(error);
      });
    }

  }


  getDocumentUrlConfig() {

    if (!this.platform.is('cordova')) {
      let themeFromUrl: any = "";
      let authIdFromUrl: any = "";
      let appNameFromUrl: any = "";
      let appServerFromUrl: any = "";
      var parser = document.createElement('a');
      parser.href = document.URL;
      var query = parser.search;
      if (query.length > 0) {
        query = query.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          var queryKey = decodeURIComponent(pair[0]);
          var queryValue = decodeURIComponent(pair[1]);
          switch (queryKey) {
            case "theme":
              themeFromUrl = queryValue;
              break;
            case "auth_id":
              authIdFromUrl = queryValue;
              break;
            case "app_name":
              appNameFromUrl = queryValue;
              break;
            case "app_server":
              appServerFromUrl = queryValue;
              break;
          }


        }

      }
      console.log('Theme from URL' + themeFromUrl);
      if (appNameFromUrl.length > 0) {
        this.setName(appNameFromUrl);
      }
      if (themeFromUrl.length > 0) {
        this.setTheme(themeFromUrl);
      }
      if (authIdFromUrl.length > 0) {
        this.setAuth(authIdFromUrl);
      }
      if (appServerFromUrl.length > 0) {
        this.setServer(appServerFromUrl);
      }

    }



  }

}
