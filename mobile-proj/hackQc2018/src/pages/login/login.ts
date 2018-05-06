import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';
import { API_USERS_URL } from '../../constants';

declare var google;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  homePage = HomePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public httpNative: HTTP,
    public httpBrowser: HttpClient) {
  }

  openSignupModal() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

  login(email, password) {
    if (this.platform.is('cordova')) {
      this.httpNative.get(API_USERS_URL + '/SearchByEmail?email=' + email, {}, {})
        .then((user) => {
          console.log(user);
          if (user.data.password === password) {
            this.navCtrl.push(HomePage, {user: user.data})
          } else {
            this.showAlert('error', 'wrong passsword');
          }
        })
        .catch((err) => { this.showAlert('error', 'no user with this email'); console.error(err) })
      } else {
        this.httpBrowser.get(API_USERS_URL + '/SearchByEmail?email=' + email, {}).toPromise().then((user) => {
          console.log(user);
          if ((user as any).password === password) {
            this.navCtrl.push(HomePage, {user: user})
          } else {
            this.showAlert('error', 'wrong passsword');
          }
        })
        .catch((err) => { this.showAlert('error', 'no user with this email') })
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
