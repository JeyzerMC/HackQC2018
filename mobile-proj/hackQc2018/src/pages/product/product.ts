import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Identifiers } from '@angular/compiler';
import { Product } from '../profile/profile';

@IonicPage()
@Component({
    selector: 'page-product',
    templateUrl: 'product.html',
})
export class ProductPage {
    @Input() productId: string;
    product: Product =
        {
            id: '5',
            name: 'tomatoes',
            price: 5.54,
            creation: "12/05/2017",
            owner: "Ross Ulbricht",
            temperature: 19,
            moisture: 89
        };

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    productsImg(name) {
        return `../../assets/imgs/products/${name}.jpg`;
    }
}
