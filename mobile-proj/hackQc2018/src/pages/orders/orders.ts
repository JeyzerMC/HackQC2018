import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewProductPage } from '../new-product/new-product';
import { LandPage } from '../land/land';
import { Product } from "../profile/profile";

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

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.products = [{id: "A26", name: "Tomatoes", price: 2.77, creation: 675455, 
                          img: this.fillImage("tomatoes")
                        },
                        {id: "B45", name: "Cucumbers", price: 1.97, creation: 687655, 
                          img: this.fillImage("cucumbers")
                        },
                        {id: "YH5", name: "Blueberries", price: 6.85, creation: 978765, 
                          img: this.fillImage("blueberries")
                        }
                        ]
    }

    public onInput(event) {
        console.log(this.search);
    }

    fillImage(name) {
        return `../../assets/imgs/products/${name}.jpg`;
    }

    public onCancel(event) {
        console.log(event);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrdersPage');
    }

}
