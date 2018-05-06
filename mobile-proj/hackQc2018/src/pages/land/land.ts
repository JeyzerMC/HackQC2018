import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-land',
  templateUrl: 'land.html',
})
export class LandPage {
  land;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.land = this.navParams.get('land');
    console.log(this.land);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandPage');
  }

  landTypeImg(type) {
    return `../../assets/imgs/lands/${type}.jpg`;
  }

}
