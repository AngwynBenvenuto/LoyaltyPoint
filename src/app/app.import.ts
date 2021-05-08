//module
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { LPSharedModule } from '../shared/LPShared.module';
export const MODULES = [
    HttpModule,
    BrowserModule,
    LPSharedModule,
    
];

//shared
import { SideMenuContentComponent } from '../side-menu/side-menu-content.component';
export const SHARED = [
    SideMenuContentComponent
]

//native Plugin
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { FCM } from '@ionic-native/fcm';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera } from '@ionic-native/camera';
import { AppVersion } from '@ionic-native/app-version';
export const NATIVEPLUGIN = [
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    Device,
    FCM,
    AndroidPermissions,
    Camera,
    AppVersion,

    

]


//API
import { LoginProvider } from '../providers/libraries/method/Login';
import { AppInfoProvider } from '../providers/libraries/method/AppInfo';
import { CheckVersionProvider } from '../providers/libraries/method/CheckVersion';
import { AuthProvider } from '../providers/libraries/method/Auth';
import { ForgotPasswordProvider } from '../providers/libraries/method/ForgotPassword';
import { VerifyEmailProvider } from '../providers/libraries/method/VerifyEmail';
import { DevicesProvider } from '../providers/libraries/method/Devices';
import { RegisterProvider } from '../providers/libraries/method/Register';
import { ProfileProvider } from '../providers/libraries/method/Profile';
import { PromoProvider } from '../providers/libraries/method/Promo';
import { VoucherProvider } from '../providers/libraries/method/Voucher';
import { HistoryProvider } from '../providers/libraries/method/History';
import { ProductProvider } from '../providers/libraries/method/Product';
import { NotificationProvider } from '../providers/libraries/method/Notification';
import { CMSProvider } from '../providers/libraries/method/CMS';

//Base Provider
import { LPImage } from '../providers/LPImage';
import { LPSession } from '../providers/LPSession';
import { LPUtils } from '../providers/LPUtils';
import { LPTranslate } from '../providers/LPTranslate';
//import { CConfig } from '../providers/network/CConfig';

export const PROVIDER = [
    //API
    LoginProvider,
    AppInfoProvider,
    CheckVersionProvider,
    AuthProvider,
    ForgotPasswordProvider,
    VerifyEmailProvider,
    DevicesProvider,
    RegisterProvider,
    ProfileProvider,
    CMSProvider,
    PromoProvider,
    VoucherProvider,
    NotificationProvider,
    HistoryProvider,
    ProductProvider,


    //Base Provider
    LPImage,
    LPSession,
    LPUtils,
    LPTranslate,
    //CConfig
]
