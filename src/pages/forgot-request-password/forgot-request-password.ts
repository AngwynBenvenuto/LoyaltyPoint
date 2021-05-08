import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,
    ModalController } from 'ionic-angular';

import { ForgotPasswordProvider } from '../../providers/libraries/method/ForgotPassword';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-forgot-request-password',
  templateUrl: 'forgot-request-password.html',
})
export class ForgotRequestPasswordPage extends LP {
  dataRequestForgetPassword:any = {
    email: '',
  }
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public forgotPasswordProvider: ForgotPasswordProvider,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
  }

  ionViewDidLoad() {
  }

  requestForgotPassword() {
    this.utils.showLoading();

    let request = this.dataRequestForgetPassword;
    if(!request.email) {
      this.utils.hideLoading();
      this.utils.showToast('Email harap diisi');
    } else {
      this.doRequestForgotPassword(request);
    }
  }

  doRequestForgotPassword(request:any) {
    this.forgotPasswordProvider.MemberRequestForget(request).then(res => {
      this.utils.hideLoading();
      if(res['err_code'] == 0) {
        this.goToVerificationForgot(request.email);
      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch(e => {
      this.utils.hideLoading();
      //this.utils.showToast(e);
    })
  }
  
  goToVerificationForgot(email:any) {
    this.viewCtrl.dismiss();
    let modalForgot = this.modalCtrl.create('ForgotPasswordPage', { email: email }, 
      {});
    modalForgot.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
