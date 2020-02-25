import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs'; 
import { LoginPage } from '../pages/login/login'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.setGlobalVars();
      this.checkToken();
    });
  }

  setGlobalVars()
  {
    // localStorage.setItem("host",   "http://"+window.location.host+'/api');
    // localStorage.setItem("asset",  "http://localhost/icine/web/storage/app");
    // localStorage.setItem("map",    "http://"+window.location.host+'/map');

    // localStorage.setItem("host",   "http://localhost/icine/web/api");
    localStorage.setItem("map",    "https://maps.googleapis.com/"); 
    localStorage.setItem("host",  "http://icine.website/app/api");
    localStorage.setItem("asset", "http://icine.website/app/storage/app");

  }

  checkToken()
  {
    if (localStorage.getItem('_id')) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginPage;
    }
  }
}
