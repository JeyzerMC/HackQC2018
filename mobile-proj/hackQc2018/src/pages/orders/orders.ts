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
                          img: "http://www.vitamix.cz/images/ovoce/detail1/3251-vitamix1.jpg"
                        },
                        {id: "B45", name: "Cucumbers", price: 1.97, creation: 687655, 
                          img: "https://nutriliving-images.imgix.net/images/2014/266/1440/5B26E568-4243-E411-B834-22000AF88B16.jpg?ch=DPR&w=1000&h=1000&auto=compress,format&dpr=1&ixlib=imgixjs-3.0.4"
                        },
                        {id: "YH5", name: "Blueberries", price: 6.85, creation: 978765, 
                          img: "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/blueberries_commodity-page.png"
                        }
                        ]
    }

    public onInput(event) {
        console.log(this.search);
    }

    public onCancel(event) {
        console.log(event);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrdersPage');
    }

}
