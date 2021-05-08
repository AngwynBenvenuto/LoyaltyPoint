import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,
  ViewController, Platform, Events } from 'ionic-angular';
import moment from 'moment';
import { ProfileProvider } from '../../providers/libraries/method/Profile';
import { LP } from '../LP';
import { LPUtils } from '../../providers/LPUtils';
import { LPTranslate } from '../../providers/LPTranslate';
import { LPImage } from '../../providers/LPImage';

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage extends LP {
  nameTitle:any;
  memberId:any;
  minDate:any = new Date(new Date().setFullYear(1900));
  maxDate:any = new Date(new Date().setFullYear(new Date().getFullYear() + 8));
  valueDate:any;
  arrYear = [];
  dataProfile:any = {
    member_id: '',
    name: '',
    email: '',
    tanggal_lahir: '',
    kota: '',
    phone: '',
    password: '',
    old_password: '',
    new_password: '',
    confirm_password:'',
    address: '',
    image: ''
  };

  @ViewChild('fileInput') fileInput: any;
  width:number = 512;
  height:number = 512;
  quality:number = 100;
  useCropperJS:boolean = true;
  themes:any;
  appName:any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public events: Events,
    public profileProvider: ProfileProvider,
    public imageProvider: LPImage,
    public utils: LPUtils,
    public translateProvider: LPTranslate) {
      super();

      this.themes = this.getTheme();
      this.appName = this.getName();
  }

  ngOnInit() {
    this.nameTitle = '';
    this.memberId = this.getUserID();
    this.loadDataProfile();
  }

  ionViewDidLoad() {
    this.getPermission();
  }

  getPermission() { }

  loadDataProfile() {
    this.profileProvider.MemberGetProfile({ member_id: this.memberId }).then(res => {
      if(res['err_code'] == 0) {
        let response = res['data'];
        this.dataProfile = {
          member_id: response['member_id'],
          name: response['name'],
          email: response['email'],
          kota: response['city_name'],
          phone: response['phone'],
          address: response['address'],
          image: response['profile_image'],
          tanggal_lahir: response['birthdate']
        }
        let birth_date_value = Date.parse(this.dataProfile.tanggal_lahir);
        this.valueDate = new Date(birth_date_value);
        console.log(this.valueDate);
      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch(e => {
      //this.utils.showToast(e);
    })
  }

  changePic() {
    if(this.platform.is('cordova')) {
      this.imageProvider.getImage(this.width, this.height, this.quality, this.useCropperJS)
        .subscribe(croppedImg => {
          this.dataProfile.image = croppedImg;
      }, err => {
        console.log(err);
      });
    } else {
      this.fileInput.nativeElement.click();
    }

  }

  uploadImageWeb(event:any) {
    let self = this;
    let imageData: string = null;
    let reader = new FileReader();

    reader.onload = (readerEvent) => {
      imageData = (readerEvent.target as any).result;
      if(this.useCropperJS){
        this.imageProvider.cropImage(imageData, this.width, this.height).subscribe(croppedImage => {
          // Handle image after crop
          this.dataProfile.image = croppedImage;
          this.resetFileReader();
        }, error => {
          //Handle cropper abort
          this.resetFileReader();
         });
      }
      else {
        this.dataProfile.image = imageData;
        this.resetFileReader();
       };
    };

    reader.onabort = function() {
      // Handle browser file upload abort
      self.dataProfile.image = "";
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  resetFileReader(){
    this.fileInput.nativeElement.value = "";
  }


  setDateBirth(date: any) {
    let set_date_birth = moment(date).format("YYYY-MM-DD");
    this.dataProfile.tanggal_lahir = set_date_birth;
  }

  editProfile() {
    this.utils.showLoading();

    let request = this.dataProfile;
    if(!request.name) {
      this.utils.hideLoading();
      this.utils.showToast('Nama harap diisi');
    } else if(!request.email) {
      this.utils.hideLoading();
      this.utils.showToast('Email harap diisi');
    } else if(!request.phone) {
      this.utils.hideLoading();
      this.utils.showToast('Nomor handphone harap diisi');
    } else {
      this.utils.hideLoading();
      this.presentConfirm(request);
    }
  }

  presentConfirm(request:any) {
    let alertConfirm = this.alertCtrl.create({
      title: this.translateProvider.get('Konfirmasi'),
      message: this.translateProvider.get('Apakah kamu yakin ingin submit data ini?'),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: this.translateProvider.get('Tidak'),
          handler: () => { }
        },
        {
          text: this.translateProvider.get('Ya'),
          handler: () => {
            this.doUpdateProfile(request);
          }
        }
      ]
    });
    alertConfirm.present();
  }

  doUpdateProfile(request:any) {
    this.utils.showLoading();
    this.profileProvider.MemberUpdateProfile(request).then((res) => {
      this.utils.hideLoading();
      if(res['err_code'] == 0) {
        this.utils.showToast('Sukses update profile.');
        this.events.publish('user:change');
        setTimeout(() => {
          this.navCtrl.pop();
        }, 2000);
      } else {
        this.utils.showToast(res['err_message']);
      }
    }).catch((e) => {
      this.utils.hideLoading();
      //this.utils.showToast(e);
    });
  }


  // parseDate(str) {
  //   var parts = str.split(" ");
  //   var date = parts[0].split("/");
  //   var day = parseInt(date[0]);
  //   var month = parseInt(date[1]) - 1;
  //   var year = parseInt(date[2]);
  //   var time = parts[1].split(":");
  //   var hour = parseInt(time[0]);
  //   var minute = parseInt(time[1]);
  //   var second = parseInt(time[2]);
  //   if (parts[2] == "PM") { hour += 12; }
  //   return new Date(year, month, day, hour, minute, second);
  // }
}
