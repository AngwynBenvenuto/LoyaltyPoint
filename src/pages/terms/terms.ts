import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CMSProvider } from '../../providers/libraries/method/CMS';
import { LP } from '../LP';
import { LPUtils } from '../../providers/LPUtils';

@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage extends LP {
  nameTitle:any;
  content:any;
  title:any;
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cmsProvider: CMSProvider,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
  }

  ngOnInit() {
    this.nameTitle = 'Terms and Conditions';
  }

  ionViewDidLoad() {
    this.loadTermsCondition();
  }

  loadTermsCondition(){
    this.cmsProvider.CMSTermsCondition({}).then(res => {
      if(res['err_code'] == 0) {
        let response = res['data'];
        this.title = response['title'];
        this.content = response['content'];
      }
    }).catch(e => {
      this.utils.showToast(e);
    })
  }
}
