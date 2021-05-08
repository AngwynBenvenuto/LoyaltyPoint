import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { LPUtils } from '../../providers/LPUtils';
import { ProductProvider } from '../../providers/libraries/method/Product';

@IonicPage()
@Component({
    selector: 'page-product-detail-modal',
    templateUrl: 'product-detail-modal.html'
})
export class ProductDetailModal {
    productId: any;
    dataFound:any;
    dataProduct:any;
    constructor(public navParams: NavParams,
        public viewCtrl: ViewController,
        public productProvider: ProductProvider,
        public utils: LPUtils ) {

    }

    ngOnInit() {
        
        this.productId = this.navParams.get('productId');
    }

    ionViewDidEnter() {
        this.loadProductDetail();
    }

    ionViewDidLoad() {

    }

    close() {
        this.viewCtrl.dismiss();
    }

    loadProductDetail() {
        this.productProvider.MemberGetProductDetail({ product_id: this.productId }).then((res) => {   
          if(res['err_code'] == 0) {
            let response = res['data'];
            if(response.length == 0) {
              this.dataFound = false;
            } else {
              this.dataFound = true;
              this.dataProduct = response;
            }
    
          } else {
            this.utils.showToast(res['err_message']);
          }
        }).catch((e) => {
          this.utils.showToast(e);
        });
      }
}