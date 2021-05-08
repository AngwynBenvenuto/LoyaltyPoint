import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NotificationProvider } from '../../providers/libraries/method/Notification';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends LP {
  notificationArray:Array<any> = new Array<any>();
  dataFound:boolean = true;
  member_id:any;
  limit = 5;
  page_start = 0;
  page_end = 5;
  has_more:boolean = true;
  infinite: any = '';
  countItems:any = 0;
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public notificationProvider: NotificationProvider,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
  }
  
  ngOnInit() {
    this.member_id = this.getUserID();
  }
  
  ionViewWillEnter(){
    if (this.infinite !== '') {
      this.infinite.enable(true);
    }
    this.has_more = true;
    this.page_start = 0;
    this.page_end = 5;
    this.limit = 5;
    this.notificationArray = [];
    this.loadNotification();
  }

  ionViewDidEnter(){ }

  ionViewDidLoad() { }

  loadNotification() {
    this.notificationProvider.MemberNofiticationHistory({ 
      member_id: this.member_id,
      page_start: this.page_start,
      page_end: this.page_end 
    }).then((res: Array<any>) => {   
      if(res['err_code'] == 0) {
        let response = res['data'];
        response.forEach(res => {
          this.notificationArray.push(res);
        });
        
        if (response.length < this.limit + 1) {
          this.has_more = false;
        } else {
          this.page_start = this.page_end + 1;
          this.page_end = this.limit + this.page_end + 1;
        }
        this.countItems = this.notificationArray.length;
        //if(response.length == 0) {
        //  this.dataFound = false;
        //} else {
        //  this.dataFound = true; 
          //this.notificationArray = response;
        //}
        
      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch((e) => {
      //this.utils.showToast(e);
    });
  }


  goToDetailNotification(detail:any) {

  }


  doInfinite(infiniteScroll) {
    if (this.has_more) {
      this.notificationProvider.MemberNofiticationHistory({ 
        member_id: this.member_id,
        page_start: this.page_start,
        page_end: this.page_end
      }).then((res: Array<any>) => {
        let dataItems = res['data'];
        dataItems.forEach(res => {
          this.notificationArray.push(res);
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
      })
    } else {
      infiniteScroll.enable(false);
      this.infinite = infiniteScroll;
    }
  }
}

