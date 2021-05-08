import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-country',
  templateUrl: 'country.html'
})
export class Country {
    data_country:any;
    temp_country:any;
    country_id:string;
    phone_code:any;
    data_obj:any;
    item_selected:any;

    constructor(public navParams: NavParams, 
        public viewCtrl: ViewController) {
        this.phone_code = this.navParams.get('phone_code');
        this.country_id = this.navParams.get('country_id');
    }

    ionViewDidLoad(){
        this.loadCountry();
        if(this.country_id !== null && this.phone_code !== null){
            this.onChangeCountry(this.country_id, this.phone_code);
        }
    }

    loadCountry() {
        // this.profile.getCountry().then(res => {
        //     this.data_country = res['data'];
        //     this.temp_country = this.data_country;
        // }, err => {
        //     console.log(err);
        // })
    }

    filterCountry(ev: any) {
        this.data_country = this.temp_country;
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.data_country = this.data_country.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } 
    }

    onChangeCountry(id, code) {
        if(this.isSelected(id)){     
            this.item_selected = id;    
        } else{
            this.item_selected = id;
            this.data_obj = { id: this.item_selected, code: code };
        }
    }

    isSelected(id) {
        return this.item_selected === id;
    }

    saveCountry() {
        this.viewCtrl.dismiss(this.data_obj);
    }

    closeCountry() { 
        this.viewCtrl.dismiss(); 
    }
}