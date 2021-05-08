import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController,
  Platform, Events } from 'ionic-angular';

import { AuthProvider } from '../../providers/libraries/method/Auth';
import { ProfileProvider } from '../../providers/libraries/method/Profile';
import { LP } from '../LP';
import { LPSession } from './../../providers/LPSession';
import { LPUtils } from '../../providers/LPUtils';
import { LPTranslate } from '../../providers/LPTranslate';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage extends LP {
  itemArray:any = [];
  username:any;
  profile_image:any;
  memberId:any;
  dataProfile:any;
  themes:any;
  appName:any;
  pagesName:any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public alertCtrl: AlertController,
    public platform: Platform,
    public events: Events,
    public session: LPSession,
    public authProvider: AuthProvider,
    public translateProvider: LPTranslate,
    public profileProvider: ProfileProvider,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
      this.appName = this.getName();
  }

  ngOnInit() {
    this.pagesName = this.navCtrl.getActive().component.name;
    this.getPageTitle(this.pagesName, this.themes);

    // profile
    this.memberId = this.getUserID();
    this.loadDataProfile();
    if(this.events) {
      this.events.subscribe("user:change", res => {
        setTimeout(() => {
          this.loadDataProfile();
        }, 200);
      })
    }
  }

  ionViewDidLoad() {
    this.loadItemSetting();
    this.getPermission();
  }

  loadDataProfile() {
    this.profileProvider.MemberGetProfile({ member_id: this.memberId }).then(res => {
      if(res['err_code'] == 0) {
        let response = res['data'];
        this.dataProfile = response;
      }
    }).catch(e => {
      //this.utils.showToast(e);
    })
  }

  loadItemSetting() {
    this.itemArray = [
      {
        icon: 'icon-moon-history',
        name: 'History',
        page: 'HistoryPage'
      },
      {
        icon: 'icon-moon-about-us',
        name: 'About Us',
        page: 'AboutPage'
      },
      {
        icon: 'icon-moon-contact-us',
        name: 'Contact Us',
        page: 'ContactPage'
      },
      {
        icon: 'icon-moon-termsconditions',
        name: 'Terms and Conditions',
        page: 'TermsPage'
      },
      {
        icon: 'icon-moon-privacypolicy',
        name: 'Privacy Policy',
        page: 'PrivacyPage'
      }
    ]
  }

  getPermission() {

  }

  goToPage(page:any) {
    this.navCtrl.push(page, {});
  }

  doEditProfile() {
    this.navCtrl.push('ProfileEditPage');
  }

  logout() {
    let alertConfirm = this.alertCtrl.create({
      title: this.translateProvider.translate('Konfirmasi'),
      message: this.translateProvider.translate('Apakah kamu yakin ingin logout dari aplikasi?'),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: this.translateProvider.translate('Tidak'),
          handler: () => { }
        },
        {
          text: this.translateProvider.translate('Ya'),
          handler: () => {
            this.doLogOut();
          }
        }
      ]
    });
    alertConfirm.present();
  }

  doLogOut() {
    if(this.platform.is('cordova')) {
      this.removeUserCloud();
    }

    this.resetData();
  }

  removeUserCloud() {
    this.authProvider.MemberLogout({}).then(res => {
      if(res['err_code'] == 0) { 
      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  resetData() {
    this.session.clearUser();
    this.app.getRootNav().setRoot('LoginPage');
  }
}
