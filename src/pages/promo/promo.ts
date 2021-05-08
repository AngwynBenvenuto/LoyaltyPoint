import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { PromoProvider } from '../../providers/libraries/method/Promo';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-promo',
  templateUrl: 'promo.html',
})
export class PromoPage extends LP {
  promoArray:Array<any> = new Array<any>();
  dataFound:boolean = true;
  limit = 5;
  page_start = 0;
  page_end = 5;
  has_more:boolean = true;
  infinite: any = '';
  countItems:any = 0;
  themes:any;
  appName:any;
  pagesName:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public promoProvider: PromoProvider,
    public utils: LPUtils) {
      super();

      this.themes = this.getTheme();
      this.appName = this.getName();
  }

  ngOnInit() {
    this.pagesName = this.navCtrl.getActive().component.name;
    this.getPageTitle(this.pagesName, this.themes);
  }

  ionViewWillEnter(){
    if (this.infinite !== '') {
      this.infinite.enable(true);
    }
    this.has_more = true;
    this.page_start = 0;
    this.page_end = 5;
    this.limit = 5;
    this.promoArray = [];
    this.loadPromo();
    this.getPermission();
  }

  ionViewDidLoad() { }

  getPermission() { }

  loadPromo() {
    this.promoProvider.MemberGetPromo({
      page_start: this.page_start, 
      page_end: this.page_end
    }).then((res: Array<any>) => {   
      if(res['err_code'] == 0) {
        let dataItems = res['data']['promo'];
        dataItems.forEach(res => {
          this.promoArray.push(res);
        });
        if (dataItems.length < this.limit + 1) {
          this.has_more = false;
        } else {
          this.page_start = this.page_end + 1;
          this.page_end = this.limit + this.page_end + 1;
        }
        this.countItems = this.promoArray.length;
        //if(response.length == 0) {
        //  this.dataFound = false;
        //} else {
        //  this.dataFound = true;
          //this.promoArray = response;
        //}

      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch((e) => {
      //this.utils.showToast(e);
    });
    
  }

  viewPromo(promo_id:any) {
    this.navCtrl.push('PromoDetailPage', { promo_id: promo_id });
  }

  doInfinite(infiniteScroll) {
    if (this.has_more) {
      this.promoProvider.MemberGetPromo({
        page_start: this.page_start, 
        page_end: this.page_end
      }).then((res: Array<any>) => {
        let dataItems = res['data']['promo'];
        dataItems.forEach(res => {
          this.promoArray.push(res);
        });

        if (dataItems.length < this.limit + 1) {
          this.has_more = false;
        } else {
          this.page_start = this.page_end + 1;
          this.page_end = this.limit + this.page_end + 1;
        }
        infiniteScroll.complete();
      });
    } else {
      infiniteScroll.enable(false);
      this.infinite = infiniteScroll;
    }
  }
}
