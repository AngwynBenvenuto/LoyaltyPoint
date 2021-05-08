import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, 
  Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LPUtils } from '../../providers/LPUtils';

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  member_id:any;
  logo_app:any;
  favico_app:any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public splashScreen: SplashScreen,
    public viewCtrl: ViewController,
    public platform: Platform,
    public utils: LPUtils) {
  }

  ionViewDidEnter() {
    //this.getLogin();
    // this.forceUpdate();

    // this.splashScreen.hide();
    // setTimeout(() => {
    //   this.viewCtrl.dismiss();
    // }, 4000);
  }

  

  //forceUpdate() {
  //}
}
