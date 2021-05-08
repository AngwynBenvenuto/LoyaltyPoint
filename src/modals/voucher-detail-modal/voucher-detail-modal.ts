import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { VoucherProvider } from '../../providers/libraries/method/Voucher';
import { LPUtils } from '../../providers/LPUtils';

@IonicPage()
@Component({
    selector: 'page-voucher-detail-modal',
    templateUrl: 'voucher-detail-modal.html'
})
export class VoucherDetailModal {
    voucher_id: any;
    dataFound:any;
    dataVoucher:any;
    constructor(public navParams: NavParams,
        public viewCtrl: ViewController,
        public voucherProvider: VoucherProvider,
        public utils: LPUtils ) {

    }

    ngOnInit() {
        
        this.voucher_id = this.navParams.get('voucherId');
    }

    ionViewDidEnter() {
        this.loadVoucherDetail();
    }

    ionViewDidLoad() {

    }

    close() {
        this.viewCtrl.dismiss();
    }

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
}