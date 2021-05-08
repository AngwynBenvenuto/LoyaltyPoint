import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Tab } from 'ionic-angular';
import { LP } from '../LP';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage extends LP {
  @ViewChild('LPTabs') LPTabs: any;
  selectedIndex:any;
  themes:any;
  arrTab:any = [];

  constructor(public navParams: NavParams) {
    super();

    this.selectedIndex = this.navParams.get('TabIndex') || 0;
    this.themes = this.getTheme();
    this.createDynamicTabs(this.themes);
  }
  
  createDynamicTabs(themes:any) {
    let arrayOfTabs = [];
    arrayOfTabs.push({ title: "Home", root: 'HomePage', icon: "icon-moon-home" });
    // if(themes == 'professional') {
    //   arrayOfTabs.push(
    //     { title: "Events", root: 'PromoPage', icon: "icon-moon-promo" },
    //     { title: "Listing", root: 'ProductPage', icon: "icon-moon-products" },
    //     { title: "Project", root: 'VoucherPage', icon: "icon-moon-voucher" }
    //   );
    // } else {
      arrayOfTabs.push(
        { title: "Promo", root: 'PromoPage', icon: "icon-moon-promo" },
        { title: "Product", root: 'ProductPage', icon: "icon-moon-products" },
        { title: "Voucher", root: 'VoucherPage', icon: "icon-moon-voucher" }
      );
    //}
    arrayOfTabs.push({ title: "Account", root: 'SettingPage', icon: "icon-moon-akun" });
    this.arrTab = arrayOfTabs;
  }


  
}
