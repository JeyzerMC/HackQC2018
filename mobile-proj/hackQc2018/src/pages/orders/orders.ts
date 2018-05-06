import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewProductPage } from '../new-product/new-product';
import { LandPage } from '../land/land';
import { Product } from "../profile/profile";
import { ProductPage } from "../product/product";

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html',
})
export class OrdersPage {
    public readonly products: Product[];
    public search: string = "";
    product = ProductPage;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.products = [{id: "A26", name: "Tomatoes", price: 2.77, creation: '25/06/2017', 
                          img: this.productsImg("tomatoes"), temperature: 24, moisture: 54,
                          owner: "Ross Ulbricht"
                        },
                        {id: "B45", name: "Cucumbers", price: 1.97, creation: 
                        '01/05/2017', 
                          img: this.productsImg("cucumbers"), temperature: 23, moisture: 92,
                          owner: "Ross Ulbricht"
                        },
                        {id: "YH5", name: "Blueberries", price: 6.85, creation: '30/05/2017', 
                          img: this.productsImg("blueberries"), temperature: 15, moisture: 85,
                          owner: "Ross Ulbricht"
                        }
                        ]
    }

    public onInput(event) {
        console.log(this.search);
    }

    productsImg(name) {
        return `../../assets/imgs/products/${name}.jpg`;
    }

    public onCancel(event) {
        console.log(event);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrdersPage');
    }

}
