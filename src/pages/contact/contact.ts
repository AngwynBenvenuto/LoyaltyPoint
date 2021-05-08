import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { CMSProvider } from '../../providers/libraries/method/CMS';
import { LP } from '../LP';
import { LPUtils } from '../../providers/LPUtils';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage extends LP {
  nameTitle:any;
  content:any;
  title:any;
  themes:any;

  constructor(public navCtrl: NavController,
    public cmsProvider: CMSProvider,
    public utils: LPUtils) {
    super();
    this.themes = this.getTheme();
  }

  ngOnInit() {
    this.nameTitle = 'Contact Us';
  }

  ionViewDidLoad(){
    this.loadContactUs();    
  }

  loadContactUs() {
    this.cmsProvider.CMSContactUs({}).then(res => {
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
