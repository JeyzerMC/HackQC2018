import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';
import { API_PRODUCTS_URL } from '../../constants';

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-new-product',
    templateUrl: 'new-product.html',
})
export class NewProductPage {
    public weeks: string[];
    public quantities: string[];

    public product: string;
    public culture: string;
    public options: string;
    public date: string;
    public duration: string;
    public price: string;
    public amount: string;


    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public platform: Platform,
                public httpNative: HTTP,
                public httpBrowser: HttpClient,
                public alertCtrl: AlertController) {
                    
        this.weeks = Array.apply(0, Array(100)).map(function (_, b) { return b + 1; });
        this.quantities = Array.apply(0, Array(100)).map(function (_, b) { return (b + 1) / 10; });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewProductPage');
    }

    register(product, culture, duration, amount, price, date, options) {
        if (this.platform.is('cordova')) {
            this.httpNative.post(API_PRODUCTS_URL, {
                Name: product,
                CultureType: culture,
                GrowthDuration: duration,
                Price: price,
                Amount: amount,
                StartDate: date,
                Options: options
            }, {})
                .then(() => this.showAlert('Product added', `The product has been added`))
                .catch((err) => { this.showAlert('error', err); console.error(err) })
        } else {
            this.httpBrowser.post(API_PRODUCTS_URL, {
                Name: product,
                CultureType: culture,
                GrowthDuration: duration,
                Price: price,
                Amount: amount,
                StartDate: date,
                Options: options
            }, {}).toPromise().then(() => this.showAlert('Product added', `The product has been added`))
                .catch((err) => { this.showAlert('error', err); console.error(err) })
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
