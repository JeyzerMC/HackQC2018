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
  img?: string;
  size?: number;
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
      landUsed: [
        {
          id: "T46",
          free: true,
          posx: 67.696050,
          posy: 76.584777,
          ownerId: "45",
          renterId: "24",
          img : "http://ville.montreal.qc.ca/pls/portal/docs/page/d_durable_fr/media/images/public/A1-Jardin_communautaire_Mile-end-4108.jpg",
          size: 13.9
        },
        {
          id: "T46",
          free: false,
          posx: 67.660530,
          posy: 76.584779,
          ownerId: "46",
          renterId: "27",
          img : "https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2015/5/17/0/CI_fairmont-rooftop-garden-montreal-6fbf6a8e0000.JPG.rend.hgtvcom.966.644.suffix/1452972294012.jpeg",
          size: 15.9
        },
      ],
      productsArriving: [],
      productsBought: [],
      productsSold: [
        {
          name: 'Tomato',
          id: '5',
          price: 2.91,
          creation: 5,
          img: "http://www.vitamix.cz/images/ovoce/detail1/3251-vitamix1.jpg"
        },
        {
          name: 'Blueberries',
          id: '5',
          price: 7.96,
          creation: 5,
          img: "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/blueberries_commodity-page.png"
        }
      ]
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
