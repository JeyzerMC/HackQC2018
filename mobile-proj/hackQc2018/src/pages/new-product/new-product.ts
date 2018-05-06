import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public product: string;
    public culture: string;
    public options: string;
    public date: string;
    public duration: string;
    public weeks: string[];
    public quantities: string[];
    public price: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.weeks = Array.apply(0, Array(100)).map(function(_,b) { return b + 1; });
        this.quantities = Array.apply(0, Array(100)).map(function(_,b) { return (b + 1)/10; });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewProductPage');
    }

}
