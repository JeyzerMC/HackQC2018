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
    price: 7,
    creation: 9
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
}
