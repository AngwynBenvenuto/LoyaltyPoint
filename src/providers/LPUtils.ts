import { Injectable } from '@angular/core';
import { Loading, LoadingController, 
    Alert, AlertController, 
    Toast, ToastController } from 'ionic-angular';
import { LPTranslate } from './LPTranslate';

@Injectable()
export class LPUtils {
    constructor(public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public translateCtrl: LPTranslate) {
    
    }

   //number
    formatCurrency(value, decimal = '.', group = ',') {
        if (!value) 
            return;

        value = value.toString();
        let parts = this.replaceFormat(decimal, value).split(decimal);
        let number = parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, group);
        let dec = (!parts[1] ? '' : (decimal + parts[1]));
        return (parts[0] == null ? '' : (number + dec));
    }

    replaceFormat(decimal = '.', val) {
        if (!val) 
            return;

        val = val.replace(/[^\.\d]/g,'')
                .replace(/[^\.\d]/g,'');
        if(decimal === '.') {
            val = val.replace(/\./g, '.');
        } else {
            val = val.replace(/,/g, '');
        }
        return val;
    }

    handleInput(value, decimal = '.', group = ',') {
        var elementValue = value;
        if(elementValue){
            var parts  = elementValue.split(decimal);
            if (parts[1] && parts[1].length > 2) {
                elementValue = parts[0] + decimal + parts[1].substring(0, 2);
            }
            if (parts.length > 2) {
                elementValue = parts[0] + decimal + parts[1].substring(0, 2);
            }
        }
        return elementValue;
    }


    //Alert
    alert: Alert;
    showMessage(text){
        if(this.alert) {
            this.alert.dismiss();
        }
        
        this.alert = this.alertCtrl.create({
            title: this.translateCtrl.translate('Notice'),
            subTitle: this.translateCtrl.translate(text),
            buttons: [ this.translateCtrl.translate('OK') ]
        });
        this.alert.present();
    }


    //Toast
    toast: Toast;
    showToast(text, ok = false, duration = 2000, position = 'bottom') {
        if (this.toast) {
            this.toast.dismiss();
        }

        this.toast = this.toastCtrl.create({
            message: this.translateCtrl.translate(text),
            duration: ok ? null : duration,
            position: position,
            showCloseButton: ok,
            closeButtonText: this.translateCtrl.translate('OK'),
            cssClass: 'toast-material'
        });
        this.toast.present();
    }


    //Loading
    loading: Loading;
    showLoading() {
        if(this.loading){
            this.loading.dismiss();
        }
        
        this.loading = this.loadingCtrl.create({
            content: this.translateCtrl.translate('Loading'),
            spinner: 'circles',
            dismissOnPageChange: true
        });
        this.loading.present();
        this.loading.onDidDismiss(()=>{
            this.loading = null;
        })
    }

    hideLoading() {
        if(this.loading)
            this.loading.dismiss();
    }

}