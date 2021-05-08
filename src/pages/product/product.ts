import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ProductProvider } from '../../providers/libraries/method/Product';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage extends LP {
  productArray:Array<any> = new Array<any>();
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
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
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
    this.productArray = [];
    this.loadProduct();
    this.getPermission();
  }

  ionViewDidLoad() { }

  getPermission() { }

  loadProduct() {
    this.productProvider.MemberGetProduct({
      page_start: this.page_start,
      page_end: this.page_end
    }).then((res: Array<any>) => {   
      if(res['err_code'] == 0) {
        let response = res['data']['product'];
        response.forEach(res => {
          this.productArray.push(res);
        });
        
        if (response.length < this.limit + 1) {
          this.has_more = false;
        } else {
          this.page_start = this.page_end + 1;
          this.page_end = this.limit + this.page_end + 1;
        }
        this.countItems = this.productArray.length;
        //if(response.length == 0) {
        //  this.dataFound = false;
        //} else {
        //  this.dataFound = true;
          //this.productArray = response;
        //}

      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch((e) => {
      //this.utils.showToast(e);
    });
    
  }

  // viewProduct(product_id:any) {
  //   this.navCtrl.push('ProductDetailPage', { product_id: product_id });
  // }

  viewProductModal(product_id:any) {
    let modalDetailProduct = this.modalCtrl.create('ProductDetailModal', { productId: product_id });
    modalDetailProduct.present();
  }

  doInfinite(infiniteScroll) {
    if (this.has_more) {
      this.productProvider.MemberGetProduct({
        page_start: this.page_start,
        page_end: this.page_end
      }).then((res: Array<any>) => {
        let dataItems = res['data']['product'];
        dataItems.forEach(res => {
          this.productArray.push(res);
        });

        if (dataItems.length < this.limit + 1) {
          this.has_more = false;
        } else {
          this.page_start = this.page_end + 1;
          this.page_end = this.limit + this.page_end + 1;
        }
        infiniteScroll.complete();
      }).catch(e => {
        this.utils.showToast(e);
      });
    } else {
      infiniteScroll.enable(false);
      this.infinite = infiniteScroll;
    }
  }
}
