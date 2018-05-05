import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { OrdersPage } from '../pages/orders/orders';
import { ProductPage } from '../pages/product/product';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { NewProductPage } from '../pages/new-product/new-product';
import { NewLandPage } from '../pages/new-land/new-land';
import { LandPage } from '../pages/land/land';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    OrdersPage,
    ProductPage,
    ProfilePage,
    SignupPage,
    NewProductPage,
    NewLandPage,
    LandPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    OrdersPage,
    ProductPage,
    ProfilePage,
    SignupPage,
    NewProductPage,
    NewLandPage,
    LandPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
