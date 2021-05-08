import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { CMSProvider } from '../../providers/libraries/method/CMS';
import { LP } from '../LP';
import { LPUtils } from '../../providers/LPUtils';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage extends LP {
  nameTitle:any;
  title:any;
  content:any;
  themes:any;

  constructor(public navCtrl: NavController,
    public cmsProvider: CMSProvider,
    public utils: LPUtils) {
    super();
    this.themes = this.getTheme();
  }

  ngOnInit(){
    this.nameTitle = 'About Us';
  }

  ionViewDidLoad() {
    this.loadAbout();
  }

  loadAbout() {
    this.cmsProvider.CMSAboutUs({}).then(res => {
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
