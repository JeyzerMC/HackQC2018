import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { API_USERS_URL } from '../../constants';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public platform: Platform,
    public httpNative: HTTP,
    public httpBrowser: HttpClient) {
  }

  signup(email: string, password: string, firstName: string, lastName: string, phone: string) {
    if (this.platform.is('cordova')) {
    this.httpNative.post(API_USERS_URL, {
      email,
      password,
      firstName,
      lastName,
      phone
    }, {})
    .then(() => this.showAlert('user added',`the user ${email} has been added, you can now login`))
    .catch((err) => {this.showAlert('error', err); console.error(err)})
    } else {
      this.httpBrowser.post(API_USERS_URL, {
        email,
        password,
        firstName,
        lastName,
        phonenumber: phone
      }, {}).toPromise().then(() => this.showAlert('user added',`the user ${email} has been added, you can now login`))
      .catch((err) => {this.showAlert('error', err); console.error(err)})
    }
  }

  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
