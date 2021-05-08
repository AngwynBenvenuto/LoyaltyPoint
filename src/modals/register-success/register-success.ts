import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, 
    ModalController } from 'ionic-angular';
import { LP } from '../../pages/LP';

@IonicPage()
@Component({
  selector: 'register-success',
  templateUrl: 'register-success.html'
})
export class RegisterSuccessModal extends LP {
    email:any;
    password:any;
    title:any;

    constructor(public viewCtrl: ViewController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController) {
            super();

            this.email = this.navParams.get('email');
            this.password = this.navParams.get('password');
            this.title = 'Terimakasih telah register diaplikasi '+ this.app_name;
    }

    ionViewDidLoad(){
    }

    confirmationEmail() {
        this.viewCtrl.dismiss();
        this.viewCtrl.onDidDismiss(() => {
            this.loadModalVerification();
        });
    }

    loadModalVerification() {
        let modalVerification = this.modalCtrl.create('VerificationEmailPage', 
            { email: this.email, password: this.password }, 
            { cssClass: 'my-fullscreen', enableBackdropDismiss: false });
        modalVerification.present();
        modalVerification.onDidDismiss(() => {
            setTimeout(() => {
                this.navCtrl.setRoot('LoginPage');
            }, 200);
        })
    }

    close() {
        this.viewCtrl.dismiss();
        this.viewCtrl.onDidDismiss(() => {
            this.loadModalVerification();
        });
    }
}
