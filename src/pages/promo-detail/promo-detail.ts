import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,
    ModalController } from 'ionic-angular';

import { PromoProvider } from '../../providers/libraries/method/Promo';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-promo-detail',
  templateUrl: 'promo-detail.html',
})
export class PromoDetailPage extends LP {
  promo_id:any;
  dataFound:boolean = true;
  dataPromo:any = {
    promo_id: '',
    name: '',
    created: '',
    image_url: ''
  };
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public promoProvider: PromoProvider,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
  }

  ngOnInit() { 
    this.promo_id = this.navParams.get('promo_id');
  }
  
  ionViewDidEnter(){
    this.loadPromoDetail();
  }

  ionViewDidLoad() { }

  loadPromoDetail() {
    this.promoProvider.MemberGetPromoDetail({ promo_id: this.promo_id }).then((res) => {   
      if(res['err_code'] == 0) {
        let response = res['data'];
        if(response.length == 0) {
          this.dataFound = false;
        } else {
          this.dataFound = true;
          this.dataPromo = response;
        }

      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch((e) => {
      //this.utils.showToast(e);
    });
  }

  viewImage(imageSrc:any) {
    let modalImage = this.modalCtrl.create('PopUpImageModal', { imageSrc: imageSrc }, 
      {});
    modalImage.present();
  }
  
  close() {
    this.viewCtrl.dismiss();
  }
}
