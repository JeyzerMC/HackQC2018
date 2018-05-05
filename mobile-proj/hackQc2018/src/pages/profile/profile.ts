import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Time } from '@angular/common';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  landOwned: Land[];
  landUsed: Land[];
  productsBought: Product[];
  productsSold: Product[];
  productsArriving: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  creation: number;
  img?: string;
}

export interface Land {
  id: string;
  free: boolean;
  posx: number;
  posy: number;
  ownerId: string;
  renterId: string;
}

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @Input() userId: string;

  user: User =
    {
      id: "dsf",
      firstName: 'Ross',
      lastName: 'Ulbricht',
      email: 'ross.ulbricht@gmail.com',
      phoneNumber: "5145145145",
      password: 'password',
      landOwned: [{
        id: "dfsdf",
        free: true,
        posx: 3,
        posy: 5,
        ownerId: "dfsdf",
        renterId: "dfsd"
      },
      {
        id: "dfsdf",
        free: false,
        posx: 3,
        posy: 5,
        ownerId: "dfsdf",
        renterId: "dfsd"
      }],
      landUsed: [],
      productsArriving: [],
      productsBought: [],
      productsSold: [
        {
          name: 'Tomato',
          id: '5',
          price: 5,
          creation: 5
        },
        {
          name: 'Banana',
          id: '5',
          price: 5,
          creation: 5
        }
      ]
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
