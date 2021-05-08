import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { VoucherProvider } from '../../providers/libraries/method/Voucher';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-voucher',
  templateUrl: 'voucher.html',
})
export class VoucherPage extends LP {
  voucherArray: Array<any> = new Array<any>();
  dataFound: boolean = true;
  limit = 5;
  page_start = 0;
  page_end = 5;
  has_more: boolean = true;
  infinite: any = '';
  countItems: any = 0;
  imgTransparent:any = 'assets/imgs/cafe/background.png';
  themes:any;
  appName:any;
  pagesName:any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public voucherProvider: VoucherProvider,
    public utils: LPUtils) {
    super();

    this.themes = this.getTheme();
    this.appName = this.getName();
  }

  ngOnInit() {
    this.pagesName = this.navCtrl.getActive().component.name;
    this.getPageTitle(this.pagesName, this.themes);
  }

  ionViewWillEnter() {
    if (this.infinite !== '') {
      this.infinite.enable(true);
    }
    this.has_more = true;
    this.page_start = 0;
    this.page_end = 5;
    this.limit = 5;
    this.voucherArray = [];
    this.loadVoucher();
    this.getPermission();
  }

  ionViewDidLoad() { }

  getPermission() { }

  loadVoucher() {
    this.voucherProvider.MemberGetVoucher({
      page_start: this.page_start,
      page_end: this.page_end
    }).then((res: Array<any>) => {
      if (res['err_code'] == 0) {
        let dataItems = res['data']['voucher'];
        dataItems.forEach(res => {
          this.voucherArray.push(res);
        });

        if (dataItems.length < this.limit + 1) {
          this.has_more = false;
        } else {
          this.page_start = this.page_end + 1;
          this.page_end = this.limit + this.page_end + 1;
        }
        this.countItems = this.voucherArray.length;
        //if(dataItems.length == 0) {
        //  this.dataFound = false;
        //} else {
        //  this.dataFound = true;
        //this.voucherArray = response;
        //}

      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch((e) => {
      //this.utils.showToast(e);
    });

  }

  // goToDetailVoucher(voucher_id: any) {
  //   let modalDetailVoucher = this.modalCtrl.create('VoucherDetailPage', { voucher_id: voucher_id },
  //     { cssClass: 'my-fullscreen' });
  //   modalDetailVoucher.present();
  // }


  doInfinite(infiniteScroll) {
    if (this.has_more) {
      this.voucherProvider.MemberGetVoucher({
        page_start: this.page_start,
        page_end: this.page_end
      }).then((res: Array<any>) => {
        let dataItems = res['data']['voucher'];
        dataItems.forEach(res => {
          this.voucherArray.push(res);
        });

        if (dataItems.length < this.limit + 1) {
          this.has_more = false;
        } else {
          this.page_start = this.page_end + 1;
          this.page_end = this.limit + this.page_end + 1;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.enable(false);
      this.infinite = infiniteScroll;
    }
  }

  viewDetail(voucherId:any) {
    
    let modalVoucherDetail = this.modalCtrl.create('VoucherDetailModal', { voucherId: voucherId }, 
      {});
      modalVoucherDetail.present();
  }
}
