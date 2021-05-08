import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';

import { LPSession } from '../../providers/LPSession';
import { LPUtils } from '../../providers/LPUtils';
import { AuthProvider } from '../../providers/libraries/method/Auth';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends LP{
  dataLogin: any = {
    username: '',
    password: ''
  };
  have_register:any;
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events,
    public session: LPSession,
    public utils: LPUtils,
    public authProvider: AuthProvider) {
      super();
      this.themes = this.getTheme();
  }

  ionViewDidLoad() {
    this.have_register = window.localStorage.getItem('have_register');
  }

  doLogin() {
    this.utils.showLoading();

    let request = this.dataLogin;
    if(!request.username) {
      this.utils.hideLoading();
      this.utils.showToast('Username masih kosong');
    } else if(!request.password) {
      this.utils.hideLoading();
      this.utils.showToast('Password masih kosong');
    } else {
      this.authProvider.MemberLogin(request).then((res) => {
        if(res['err_code'] == 0) {
          this.session.setUser(res['data']);
          this.events.publish("user:loggedIn", res['data']);

          //check
          let response = res['data'];
          let email = response['email'];
          let password = response['password'];
          let email_verified = response['email_verified'];
          setTimeout(() => {
            if(email_verified == "0") {
              let modalVerify = this.modalCtrl.create('VerificationEmailPage', 
                { email: email, password: password }, 
                { cssClass: 'my-fullscreen', enableBackdropDismiss: false });
              modalVerify.present();
            } else {
              this.navCtrl.setRoot('TabsPage');
            }
          }, 200);
        } else {
          this.utils.showToast(res['err_message']);
        }
        this.utils.hideLoading();
      }).catch((e) => {
        this.utils.hideLoading();
        //this.utils.showToast(e);
      });
    }
    
  }

  goToForgot() {
    let modalForgot = this.modalCtrl.create('ForgotRequestPasswordPage', null, 
      { });
    modalForgot.present();
  }

  goToSignup() {
    this.navCtrl.push('RegisterPage');
  }
}
