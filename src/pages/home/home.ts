import { Component, ViewChild } from '@angular/core';
import {NavController, IonicPage, ModalController,
  Events, Slides } from 'ionic-angular';

import { CMSProvider } from '../../providers/libraries/method/CMS';
import { ProfileProvider } from '../../providers/libraries/method/Profile';
import { LP } from '../LP';
import { LPUtils } from '../../providers/LPUtils';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends LP {
  //akses slider
  @ViewChild('sliderBanner') sliderBanner: Slides;
  @ViewChild('sliderPromo') sliderPromo: Slides;
  @ViewChild('sliderVoucher') sliderVoucher: Slides;
  @ViewChild('sliderProduct') sliderProduct: Slides;

  //variable
  public bannerData = [];
  public promoData = [];
  public voucherData = [];
  public productData = [];
  public nameTitle: any;
  username: any;
  profile_image: any;
  memberId: any;
  dataProfile: any;
  imgTransparent: any = 'assets/imgs/cafe/background.png';
  themes:any;
  appName:any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events,
    public cmsProvider: CMSProvider,
    public profileProvider: ProfileProvider,
    public utils: LPUtils) {
    super();
    this.themes = this.getTheme();
    this.appName = this.getName();
  }


  ngOnInit() {
    this.nameTitle = 'Welcome!';
    this.getPageTitle(null, this.themes);
    this.memberId = this.getUserID();
    this.loadDataProfile();
    if (this.events) {
      this.events.subscribe("user:change", res => {
        setTimeout(() => {
          this.loadDataProfile();
        }, 200);
      })
    }
  }

  ionViewWillEnter() {
    this.cmsSlider();
  }

  ionViewDidLoad() { }

  loadDataProfile() {
    this.profileProvider.MemberGetProfile({ member_id: this.memberId }).then(res => {
      if (res['err_code'] == 0) {
        let response = res['data'];
        this.dataProfile = response;
      }
    }).catch(e => {
      //this.utils.showToast('Koneksi tidak ada');
    })
  }

  cmsSlider() {
    this.bannerData = [];
    this.productData = [];
    this.voucherData = [];
    this.promoData = [];
    this.cmsProvider.CMSHome({}).then(res => {
      if (res['err_code'] == 0) {
        let response = res['data'];
        this.bannerData = response['slide'];
        this.productData = response['slide_product'];
        this.voucherData = response['slide_voucher'];
        this.promoData = response['slide_promo'];
      }
    }).catch(e => {
      //this.utils.showToast(e);
    })
  }


  goToSetting() {
    this.navCtrl.push('SettingPage');
  }


  //promo
  viewPromo(promo_id: any) {
    this.navCtrl.push('PromoDetailPage', { promo_id: promo_id });
  }
  seeMorePromo() {
    this.navCtrl.parent.select(1);
    //this.navCtrl.setRoot('PromoPage', {});
  }


  //voucher
  viewVoucher(voucherId: any) {

    let modalDetailVoucher = this.modalCtrl.create('VoucherDetailModal', { voucherId: voucherId });
    modalDetailVoucher.present();
  }
  seeMoreVoucher() {
    this.navCtrl.parent.select(3);
    //this.navCtrl.push('VoucherPage', {});
  }


  //product
  viewProduct(product_id: any) {
    this.navCtrl.push('ProductDetailPage', { product_id: product_id });
  }
  viewProductModal(productId: any) {

    let modalDetailProduct = this.modalCtrl.create('ProductDetailModal', { productId: productId });
    modalDetailProduct.present();
  }
  seeMoreProduct() {
    this.navCtrl.parent.select(2);
    //this.navCtrl.push('ProductPage', {});
  }
}
