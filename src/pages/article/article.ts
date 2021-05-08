import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LP } from '../LP';

@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage extends LP {
  nameTitle:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      super();
      
  }

  ngOnInit() {
    this.nameTitle = 'Article';
  }

  ionViewDidLoad() {
  }

}
