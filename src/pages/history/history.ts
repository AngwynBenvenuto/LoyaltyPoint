import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from '../../providers/libraries/method/Profile';
import { HistoryProvider } from '../../providers/libraries/method/History';
import { LPUtils } from '../../providers/LPUtils';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage extends LP {
  nameTitle:any;
  historyArray:Array<any> = new Array<any>();
  dataFound:boolean = true;
  member_id:any;
  limit = 5;
  page_start = 0;
  page_end = 5;
  has_more:boolean = true;
  infinite: any = '';
  countItems:any = 0;
  points: any;
  themes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public profileProvider: ProfileProvider,
    public historyProvider: HistoryProvider,
    public utils: LPUtils) {
      super();
      this.themes = this.getTheme();
  }

  ngOnInit() {
    this.nameTitle = 'History';
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
    this.historyArray = [];
    this.loadHistory();
    this.loadPoint();
  } 

  ionViewDidEnter() { }

  ionViewDidLoad() { }


  loadPoint(){ 
    this.profileProvider.MemberGetProfile({
      member_id: this.member_id
    }).then((res: Array<any>) => {
      let response = res['data'];
      this.points = response['point_balance'];
    }).catch(e => {
      //console.log(e);
    })
  }

  loadHistory() {
    this.historyProvider.PointHistory({
      member_id: this.member_id,
      page_start: this.page_start,
      page_end: this.page_end,
    }).then((res: Array<any>) => {   
      if(res['err_code'] == 0) {
        let response = res['data'];
        response.forEach(res => {
          this.historyArray.push(res);
        });

        if (response.length < this.limit + 1) {
          this.has_more = false;
        } else {
          this.page_start = this.page_end + 1;
          this.page_end = this.limit + this.page_end + 1;
        }
        this.countItems = this.historyArray.length;
        //if(response.length == 0) {
        //  this.dataFound = false;
        //} else {
        //  this.dataFound = true;
          //this.historyArray = response;
        //}
        
      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch((e) => {
      //this.utils.showToast(e);
    });
  }

  goToDetailHistory(detail_history:any) {

  }

  doInfinite(infiniteScroll) {
    if (this.has_more) {
      this.historyProvider.PointHistory({
        member_id: this.member_id,
        page_start: this.page_start,
        page_end: this.page_end,
      }).then((res: Array<any>) => { 
        let dataItems = res['data'];
        dataItems.forEach(res => {
          this.historyArray.push(res);
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
      });;
    } else {
      infiniteScroll.enable(false);
      this.infinite = infiniteScroll;
    }
  }
}
