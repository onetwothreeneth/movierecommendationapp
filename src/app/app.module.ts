import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule          } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { VerificationPage } from '../pages/verification/verification';
import { FavoritePage } from '../pages/favorite/favorite';
import { SearchPage } from '../pages/search/search';
import { MenuPage } from '../pages/menu/menu';
import { ProfilePage } from '../pages/profile/profile';
import { DetailsPage } from '../pages/details/details';
import { Places } from '../pages/places/places';
import { Watchlist } from '../pages/watchlist/watchlist';
import { Reviews } from '../pages/reviews/reviews';
import { History } from '../pages/history/history';
import { Reviewers } from '../pages/reviewers/reviewers';
import { ForgotPage } from '../pages/forgot/forgot';
import { NewRelease } from '../pages/newrelease/newrelease';
import { Upcoming } from '../pages/upcoming/upcoming';
import { Video } from '../pages/video/video';
import { Ar } from '../pages/ar/ar';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation'; 
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';  
import { VideoPlayer } from '@ionic-native/video-player';
 
import { BarcodeScanner      } from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,Reviewers,ForgotPage,
    LoginPage,RegisterPage,VerificationPage,
    FavoritePage,SearchPage,MenuPage,
    ProfilePage,DetailsPage,Places,Watchlist,Reviews,History,
    NewRelease,Upcoming,Video,Ar
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,Reviewers,ForgotPage,
    LoginPage,RegisterPage,VerificationPage,
    FavoritePage,SearchPage,MenuPage,
    ProfilePage,DetailsPage,Places,Watchlist,Reviews,History,
    NewRelease,Upcoming,Video,Ar
  ],
  providers: [
    StatusBar,Geolocation,
    SplashScreen, BarcodeScanner,VideoPlayer,ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
