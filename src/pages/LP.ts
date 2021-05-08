import { Injectable } from "@angular/core";
import { NavController } from 'ionic-angular';
import { CConfig } from '../providers/network/CConfig';


@Injectable()
export abstract class LP extends CConfig {
    public navCtrl: NavController;
    
    //title
    public pageHomeTitle:any = null;
    public pagePromoTitle:any = null;
    public pageProductTitle:any = null;
    public pageVoucherTitle:any = null;
    public pageSettingTitle:any = null;

    //logo 
    public cmsHeader: any = null;
    public loginBackground: any = null;

    constructor() {
        super();

        this.checkLogo();
    }


    protected checkLogo() {
        let logoLogin = window.localStorage.getItem('login_background');
        this.loginBackground = this.checkDefaultImg(logoLogin);

        let logoHeader = window.localStorage.getItem('cms_header');
        this.cmsHeader = this.checkDefaultImg(logoHeader);
    }
    private checkDefaultImg(storage:any) {
        let logo = null;
        let defaultImg = 'assets/imgs/no-image.jpg';
        let imgStorage = storage;
        if(imgStorage == 'undefined')
            logo = defaultImg;
        else {
            let checkImg = imgStorage;
            if(checkImg == null) 
                return;
            checkImg = checkImg.toString();
            checkImg = checkImg.split("/").pop();
            let noImg = (checkImg == "noimage.png" ? defaultImg : imgStorage);
            logo = noImg;
        }
        return logo;
    }

    
    //function on page
    protected goToNotification() {
        this.navCtrl.push('NotificationPage');
    }
    protected goToHistory() {
        //this.navCtrl.parent.select(2);
        this.navCtrl.push('HistoryPage');
    }
    protected goToUserSetting() {
        this.navCtrl.parent.select(4);
    }


    //get title on page
    protected getPageTitle(page: any, themes: any) {
        this.pageHomeTitle = 'Home';
        // if(themes == 'professional') {
        //     this.pagePromoTitle = 'Events';
        //     this.pageProductTitle = 'Listing';
        //     this.pageVoucherTitle = 'Project';
        // } else {
            this.pagePromoTitle = 'Promo';
            this.pageProductTitle = 'Product';
            this.pageVoucherTitle = 'Voucher';
        //}
        this.pageSettingTitle = 'Setting';
    }


    //get session user ID
    protected getUserID() {
        let userArraySession = JSON.parse(window.localStorage.getItem("user"));
        let memberId = userArraySession['member_id'];
        return memberId || [];
    }



}