import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, 
  AlertController } from 'ionic-angular';

import { RegisterProvider } from '../../providers/libraries/method/Register';
import { LPTranslate } from '../../providers/LPTranslate';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends LP{
  dataRegister:any = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  };
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public registerProvider: RegisterProvider,
    public translateProvider: LPTranslate,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
  }

  ionViewDidLoad() {
  }

  getPermission() { }


  register() {
    this.utils.showLoading();

    let request = this.dataRegister;
    if(!request.name) {
      this.utils.hideLoading();
      this.utils.showToast('Nama harap diisi');
    } else if(!request.email) {
      this.utils.hideLoading();
      this.utils.showToast('Email harap diisi');
    } else if(!request.phone) {
      this.utils.hideLoading();
      this.utils.showToast('Nomor handphone harap diisi');
    } else if(!request.password) {
      this.utils.hideLoading();
      this.utils.showToast('Password harap diisi');
    } else if(!request.confirm_password) {
      this.utils.hideLoading();
      this.utils.showToast('Konfirmasi password harap diisi');
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
            this.doRegister(request);
          }
        }
      ]
    });
    alertConfirm.present();
  }

  doRegister(request:any) {
    this.utils.showLoading();
    this.registerProvider.MemberRegister(request).then((res) => {
      this.utils.hideLoading();
      if(res['err_code'] == 0) {
        let response = res['data'];
        let email = response['email'];
        let password = response['password'];
        let is_verify_email = response['is_verify_email'];
        if(is_verify_email == '0') {
          this.showModalSuccess(email, password);
        }
      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch((e) => {
      this.utils.hideLoading();
      //this.utils.showToast(e);
    });
    
  }

  showModalSuccess(email:any, password: any) {
    let modalSuccess = this.modalCtrl.create('RegisterSuccessModal', 
        { email: email, password: password }, 
        { enableBackdropDismiss: false });
    modalSuccess.present();
  }

  goToLogin() {
    this.navCtrl.setRoot('LoginPage');
  }
}
