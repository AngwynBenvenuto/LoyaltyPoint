import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,
  AlertController, ModalController, Events, App } from 'ionic-angular';

import { VerifyEmailProvider } from '../../providers/libraries/method/VerifyEmail';
import { LPTranslate } from '../../providers/LPTranslate';
import { LPSession } from '../../providers/LPSession';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-verification-email',
  templateUrl: 'verification-email.html',
})
export class VerificationEmailPage extends LP{
  dataVerifyEmail:any = {
    email: '',
    password: '',
    otp_code: ''
  };
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events,
    public app: App,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public verifyEmailProvider: VerifyEmailProvider,
    public translateProvider: LPTranslate,
    public session: LPSession,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
  }

  ionViewDidLoad() {
    this.dataVerifyEmail.email = this.navParams.get('email');
    this.dataVerifyEmail.password = this.navParams.get('password');
  }

  requestVerify() {
    this.utils.showLoading();

    let request = this.dataVerifyEmail;
    if(!request.email) {
      this.utils.hideLoading();
      this.utils.showToast('Email harap diisi');
    } else if(!request.otp_code) {
      this.utils.hideLoading();
      this.utils.showToast('Kode OTP harap diisi');
    } else {
      this.utils.hideLoading();
      this.presentConfirm(request);
    }
  }

  presentConfirm(request:any) {
    let alertConfirm = this.alertCtrl.create({
      title: this.translateProvider.get('Konfirmasi'),
      message: this.translateProvider.get('Apakah kamu yakin ingin submit data ini?'),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: this.translateProvider.get('Tidak'),
          handler: () => { }
        },
        {
          text: this.translateProvider.get('Ya'),
          handler: () => {
            this.doVerify(request);
          }
        }
      ]
    });
    alertConfirm.present();
  }

  doVerify(request:any) {
    this.utils.showLoading();
    this.verifyEmailProvider.MemberVerifyEmail(request).then(res => {
      this.utils.hideLoading();
      if(res['err_code'] == 0) {
        this.utils.showToast('Verifikasi email anda telah sukses, Silahkan login dengan username dan password anda');
        setTimeout(() => {
          this.viewCtrl.dismiss();
          this.navCtrl.setRoot('LoginPage');
        }, 2000);
        
      } else {
        this.utils.showToast(res['err_message']);
      } 
    }).catch(e => {
      this.utils.hideLoading();
      this.utils.showToast(e);
    })
  }

  resendVerifyEmail() {
    this.utils.showLoading();
    this.verifyEmailProvider.MemberRequestVerificationEmail({ 
      email: this.dataVerifyEmail.email 
    }).then(res => {
      this.utils.hideLoading();
      if(res['err_code'] == 0) {
        this.utils.showToast('Sukses untuk mengirim ulang verifikasi email.');
      } else {
        this.utils.showToast(res['err_message']);
      } 
    }).catch(e => {
      this.utils.hideLoading();
      this.utils.showToast(e);
    })

  }

  // memberLogin() {
  //   this.utils.showLoading();
  //   this.authProvider.MemberLogin({
  //     username: this.dataVerifyEmail.email,
  //     password: this.dataVerifyEmail.password
  //   }).then(res => {
  //     this.utils.hideLoading();
  //     if(res['err_code'] == 0) {
  //       this.session.setUser(res['data']);
  //       this.events.publish("user:loggedIn", res['data']);

  //       this.navCtrl.setRoot('LoginPage');
  //       //this.navCtrl.setRoot('TabsPage');
  //     } else {
  //       this.utils.showToast(res['err_message']);
  //     } 
  //   }).catch(e => {
  //     this.utils.hideLoading();
  //     this.utils.showToast(e);
  //   })
  // }

  close() {
    this.viewCtrl.dismiss();
  }
}
