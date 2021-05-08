import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,
  ModalController } from 'ionic-angular';

import { VoucherProvider } from '../../providers/libraries/method/Voucher';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-voucher-detail',
  templateUrl: 'voucher-detail.html',
})
export class VoucherDetailPage extends LP {
  nameTitle:any;
  voucher_id:any;
  dataVoucher:any = {
    voucher_id: '',
    name: '',
    point: '',
    stock: '',
    description: '',
    created: '',
    image_url: ''
  };
  dataFound:boolean = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public voucherProvider: VoucherProvider,
    public utils: LPUtils) {
      super();
  }

  ngOnInit() {
    this.voucher_id = this.navParams.get('voucher_id');
  }

  ionViewDidEnter(){
    this.loadVoucherDetail();
  }

  ionViewDidLoad() { }

  loadVoucherDetail() {
    this.voucherProvider.MemberGetVoucherDetail({ voucher_id: this.voucher_id }).then((res) => {   
      if(res['err_code'] == 0) {
        let response = res['data'];
        if(response.length == 0) {
          this.dataFound = false;
        } else {
          this.dataFound = true;
          this.dataVoucher = response;
        }

      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch((e) => {
      this.utils.showToast(e);
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
