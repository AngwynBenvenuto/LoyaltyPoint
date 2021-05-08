import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ProductProvider } from '../../providers/libraries/method/Product';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage extends LP {
  product_id:any;
  dataFound:boolean = true;
  dataProduct:any = {
    
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public productProvider: ProductProvider,
    public utils: LPUtils) {
      super();
  }

  ngOnInit() { 
    this.product_id = this.navParams.get('product_id');
  }

  ionViewDidEnter(){
    this.loadProductDetail();
  }

  ionViewDidLoad() { }

  loadProductDetail() {
    this.productProvider.MemberGetProductDetail({ product_id: this.product_id }).then((res) => {   
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

  viewImage(imageSrc:any) {
    let modalImage = this.modalCtrl.create('PopUpImageModal', { imageSrc: imageSrc }, 
      {});
    modalImage.present();
  }

}
