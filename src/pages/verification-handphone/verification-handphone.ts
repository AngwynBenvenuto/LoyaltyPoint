import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,
  AlertController, ModalController } from 'ionic-angular';

// import { VerifyEmailProvider } from '../../providers/libraries/method/VerifyEmail';
import { LPTranslate } from '../../providers/LPTranslate';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-verification-handphone',
  templateUrl: 'verification-handphone.html',
})
export class VerificationHandphonePage extends LP{
  dataVerifyHandphone:any = {
    phone: ''
  };
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public translateProvider: LPTranslate,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
  }

  ionViewDidLoad() {
    
  }

  requestVerify() {
    this.utils.showLoading();

    let request = this.dataVerifyHandphone;
    if(!request.phone) {
      this.utils.hideLoading();
      this.utils.showToast('Telepon harap diisi');
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
    // this.verifyEmailProvider.MemberRequestVerificationEmail(request).then(res => {
    //   this.utils.hideLoading();
    //   if(res['err_code'] == 0) {
    //     this.utils.showToast('Sukses untuk mengirim ulang verifikasi email.');
    //     setTimeout(() => {
    //       this.goToVerifyPage(request);
    //     }, 2000);
    //   } else {
    //     this.utils.showToast(res['err_message']);
    //   } 
    // }).catch(e => {
    //   this.utils.hideLoading();
    //   this.utils.showToast(e);
    // })
    
  }

  // goToVerifyPage(request:any) {
  //   this.viewCtrl.dismiss();
  //   let verifyEmailModal = this.modalCtrl.create('VerificationEmailPage', { email: request.email }, 
  //     { cssClass: 'my-fullscreen' });
  //   verifyEmailModal.present();
  // }
  resendVerify() {

  }
  
  close() {
    this.viewCtrl.dismiss();
  }
}
