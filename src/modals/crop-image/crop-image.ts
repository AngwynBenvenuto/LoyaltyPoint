import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import Cropper from 'cropperjs';

@IonicPage()
@Component({
  selector: 'crop-image',
  templateUrl: 'crop-image.html'
})
export class CropImageModal {
    @ViewChild('image') input: ElementRef;
    imageBase64: any;
    width: number;
    height: number;
    cropper: Cropper;
    cropperOptions: any;
    themes:any;

    constructor(public viewCtrl: ViewController, 
        public navParams: NavParams) 
    {
        this.imageBase64 = this.navParams.get("imageBase64");
        this.width = this.navParams.get("width");
        this.height = this.navParams.get("height");
        this.themes = window.localStorage.getItem('themes');
        
        this.cropperOptions = {
            dragMode: 'crop',
            aspectRatio: this.width / this.height,
            modal: true,
            guides: true,
            highlight: true,
            center: true,
            background: true,
            autoCrop: true,
            autoCropArea: 0.9,
            responsive: true,
            cropBoxMovable: true,
            cropBoxResizable: true,
            crop: (e) => {}
        };

    }

    cropperLoad() {
        this.cropper = new Cropper(this.input.nativeElement, this.cropperOptions);
    }
    
    cropperReset() { 
        this.cropper.reset();
    }
    
    imageRotate() { 
        this.cropper.rotate(90); 
    }
    
    cancel() { 
        this.viewCtrl.dismiss(); 
    }
    
    finish() {
        let croppedImgB64String: string = this.cropper.getCroppedCanvas({
            width: this.width,
            height: this.height
        }).toDataURL('image/jpeg');        
        this.viewCtrl.dismiss(croppedImgB64String);
    }
}
