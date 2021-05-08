import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,
  AlertController, ModalController } from 'ionic-angular';

import { VerifyEmailProvider } from '../../providers/libraries/method/VerifyEmail';
import { LPTranslate } from '../../providers/LPTranslate';
import { LPUtils } from '../../providers/LPUtils';

@IonicPage()
@Component({
  selector: 'page-verification-resend-email',
  templateUrl: 'verification-resend-email.html',
})
export class VerificationResendEmailPage {
  dataVerifyResendEmail:any = {
    email: ''
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public verifyEmailProvider: VerifyEmailProvider,
    public translateProvider: LPTranslate,
    public utils: LPUtils) {
  }

  ionViewDidLoad() {
    
  }

  requestVerify() {
    this.utils.showLoading();

    let request = this.dataVerifyResendEmail;
    if(!request.email) {
      this.utils.hideLoading();
      this.utils.showToast('Email is empty.');
    } else {
      this.utils.showLoading();
      this.presentConfirm(request);
    }
  }

  presentConfirm(request:any) {
    let alertConfirm = this.alertCtrl.create({
      title: this.translateProvider.get('Confirmation'),
      message: this.translateProvider.get('Are you sure you want to submit this data?'),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: this.translateProvider.get('No'),
          handler: () => { }
        },
        {
          text: this.translateProvider.get('Yes'),
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
    this.verifyEmailProvider.MemberRequestVerificationEmail(request).then(res => {
      this.utils.hideLoading();
      if(res['err_code'] == 0) {
        this.utils.showToast('Success resend email!');
        setTimeout(() => {
          this.goToVerifyPage(request);
        }, 2000);
      } else {
        this.utils.showToast(res['err_message']);
      } 
    }).catch(e => {
      this.utils.hideLoading();
      this.utils.showToast(e);
    })
    
  }

  goToVerifyPage(request:any) {
    this.viewCtrl.dismiss();
    let verifyEmailModal = this.modalCtrl.create('VerificationEmailPage', { email: request.email }, 
      { cssClass: 'my-fullscreen' });
    verifyEmailModal.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
