import { Injectable } from '@angular/core';
import { AlertController, ModalController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LPTranslate } from './LPTranslate';

@Injectable()
export class LPImage {
    constructor(public alertCtrl: AlertController,
        public modalCtrl: ModalController, 
        public androidPermissions: AndroidPermissions, 
        public camera: Camera, 
        public platform: Platform,
        public translate: LPTranslate){ 

    }

    getImage(width: number, height: number, quality: number, useCropperJS: boolean) {
        return Observable.create(observer => {
            let imageOptions: CameraOptions = {
                quality: quality,
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.CAMERA,
                encodingType: this.camera.EncodingType.JPEG,
                correctOrientation: true,
                saveToPhotoAlbum: false,
                mediaType: this.camera.MediaType.PICTURE,
                cameraDirection: 1
            };

            let selectAlert = this.alertCtrl.create({
                title: this.translate.get('Informasi'),
                message: this.translate.get('Mau mengupload dari?'),
                enableBackdropDismiss: false,
                buttons: [{
                    text: this.translate.get('Album'),
                    handler: data => {
                        //Change sourceType to PHOTOLIBRARY
                        imageOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
                        selectAlert.dismiss();
                    }
                }, {
                    text: this.translate.get('Kamera'),
                    handler: data => {
                        selectAlert.dismiss();
                    }
                }]
            });

            selectAlert.onDidDismiss(() => {
                this.getCameraImage(imageOptions).subscribe(image => {
                    if (useCropperJS) {
                        this.cropImage(image, width, height).subscribe(croppedImage => {
                            observer.next(croppedImage);
                            observer.complete();
                        }, error => {
                            observer.error(this.translate.get("Canceled while cropping."));
                        });
                    }
                    else {
                        observer.next(image);
                        observer.complete();
                    }
                }, error => observer.error(error));
            });
            selectAlert.present();
        });       
    }

    getCameraImage(options: any) {
        return Observable.create(observer => {
            this.platform.ready().then(() => {
                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(success => {
                    this.camera.getPicture(options).then((imageData: any) => {
                        // imageData is a base64 encoded string as per options set above
                            let base64Image: string = "data:image/jpeg;base64," + imageData;
                            observer.next(base64Image);
                            observer.complete();
                        }, error => {
                            observer.error(error);
                        });
                    }, err => {
                        this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.CAMERA);
                        observer.error(this.translate.get("Try again"));
                    }
                );
            });
        });
    }
    
    cropImage(image: string, width: number, height: number) {
        return Observable.create(observer => {
            let cropModal = this.modalCtrl.create('CropImageModal', 
                { "imageBase64": image, "width": width, "height": height }
            );
            cropModal.onDidDismiss((croppedImage: any) => {
                if (!croppedImage)
                    observer.error("Canceled while cropping.");
                else {
                    observer.next(croppedImage);
                    observer.complete();
                }
            });
            cropModal.present();

        });
    }

}