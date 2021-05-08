import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ForgotPasswordProvider } from '../../providers/libraries/method/ForgotPassword';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage extends LP{
  dataForgotPassword:any = {
    email: '',
    new_password: '',
    new_confirm: '',
    otp_code: '',
  }
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public forgotPasswordProvider: ForgotPasswordProvider,
    public utils: LPUtils) {
      super();
      this.dataForgotPassword.email = this.navParams.get('email');
      this.themes = this.getTheme();
  }

  ngOnInit() { }

  ionViewDidLoad() { }

  forgotPassword() {
    this.utils.showLoading();

    let request = this.dataForgotPassword;
    if(!request.email) {
      this.utils.hideLoading();
      this.utils.showToast('Email harap diisi');
    } else if(!request.new_password) {
      this.utils.hideLoading();
      this.utils.showToast('Password baru harap diisi');
    } else if(!request.new_confirm) {
      this.utils.hideLoading();
      this.utils.showToast('Konfirmasi password harap diisi');
    } else if(request.new_password != request.new_confirm) {
      this.utils.hideLoading();
      this.utils.showToast('Password baru dan Konfirmasi password tidak sama');
    } else if(!request.otp_code) {
      this.utils.hideLoading();
      this.utils.showToast('Kode OTP harap diisi');
    } else {
      this.doForgotPassword(request);
    }
    
  }

  doForgotPassword(request:any) {
    this.forgotPasswordProvider.MemberForgetPassword(request).then(res => {
      this.utils.hideLoading();
      if(res['err_code'] == 0) {
        this.utils.showToast('Sukses reset password. Silahkan login kembali');
        setTimeout(() => {
          this.viewCtrl.dismiss();
        }, 1000);
      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch(e => {
      this.utils.hideLoading();
      //this.utils.showToast(e);
    })
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
