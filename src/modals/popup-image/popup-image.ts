import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popup-image',
  templateUrl: 'popup-image.html'
})
export class PopUpImageModal {
    imageSrc:any;
    constructor(public navParams: NavParams,
        public viewCtrl: ViewController){
        
    }

    ngOnInit() {
        this.imageSrc = this.navParams.get('imageSrc');
    }

    ionViewDidLoad(){
     
    }

    close() {
        this.viewCtrl.dismiss();
    }
}