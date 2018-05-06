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
    product: Product;

    constructor(
      public navCtrl: NavController,
      public navParams: NavParams) {
      console.log('product:', this.product);
    }

    productsImg(name) {
        return `../../assets/imgs/products/${name}.jpg`;
    }
}

