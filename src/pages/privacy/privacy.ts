import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CMSProvider } from '../../providers/libraries/method/CMS';
import { LP } from '../LP';
import { LPUtils } from '../../providers/LPUtils';
import { LPTranslate } from '../../providers/LPTranslate';

@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage extends LP {
  nameTitle:any;
  title:any;
  content:any;
  themes:any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: LPTranslate,
    public cmsProvider: CMSProvider,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
  }

  ngOnInit() {
    this.nameTitle = 'Privacy Policy';
  }

  ionViewDidLoad() {
    this.loadPrivacyPolicy();
  }

  loadPrivacyPolicy() {
    this.cmsProvider.CMSPrivacyPolicy({}).then(res => {
      if(res['err_code'] == 0) {
        let response = res['data'];
        this.title = response['title'];
        this.content = response['content'];
      }
    }).catch(e => {
      //this.utils.showToast(e);
    })
  }
} 
