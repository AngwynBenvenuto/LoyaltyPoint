import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }

  loadProfile() {
    
  }

  doEditProfile() {
    let modalEditProfile = this.modalCtrl.create('ProfileEditPage' , {});
    modalEditProfile.present();
    modalEditProfile.onDidDismiss(() => {

    });
  }
}
