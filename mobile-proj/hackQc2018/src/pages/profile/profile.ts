import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Time } from '@angular/common';
import { LandPage } from '../land/land';
import { NewProductPage } from '../new-product/new-product';
import { ProductPage } from '../product/product';
import { NewLandPage } from '../new-land/new-land';

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
  creation: string;
  img?: string;
  owner?: string;
  temperature?: number;
  moisture?: number;
}

export interface Land {
  id: string;
  free: boolean;
  posx: number;
  posy: number;
  ownerId: string;
  renterId: string;
  img?: string;
  size?: number;
  address?: string;
}

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @Input() userId: string;

  land = LandPage;
  product = ProductPage;
  newLand = NewLandPage;
  newProduct = NewProductPage;

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
      landUsed: [
        {
          id: "T46",
          free: true,
          posx: 67.696050,
          posy: 76.584777,
          ownerId: "45",
          renterId: "24",
          img: this.landTypeImg("garden"),
          size: 13.9,
          address: "Mile End, Montreal, H2T 2V7"
        },
        {
          id: "T46",
          free: false,
          posx: 67.660530,
          posy: 76.584779,
          ownerId: "46",
          renterId: "27",
          img: this.landTypeImg("rooftop"),
          size: 15.9,
          address: "Outremont, Montreal, H2V 2W5"
        },
      ],
      productsArriving: [],
      productsBought: [],
      productsSold: [
        {
          name: 'Tomatoes',
          id: '5',
          price: 2.91,
          creation: '25/05/2017',
          img: this.productsImg("tomatoes"),
          owner: "Ross Ulbricht",
          temperature: 25,
          moisture: 81
        },
        {
          name: 'Blueberries',
          id: '5',
          price: 7.96,
          creation: '24/04/2017',
          img: this.productsImg("blueberries"),
          owner: "John Robinson",
          temperature: 21,
          moisture: 71
        }
      ]
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('profile:', this.user);
  }

  selectLand() {

  }

  landTypeImg(type) {
    return `../../assets/imgs/lands/${type}.jpg`;
  }

  productsImg(name) {
    return `../../assets/imgs/products/${name}.jpg`;
  }

}
