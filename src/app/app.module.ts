import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PROVIDER, MODULES, NATIVEPLUGIN, SHARED } from './app.import';


@NgModule({
  declarations: [
    MyApp,
    SHARED,
    
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      mode: 'md',
	    scrollPadding: false,
	    scrollAssist: true,
	    autoFocusAssist: false,
      
	  
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    PROVIDER,
    NATIVEPLUGIN,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
