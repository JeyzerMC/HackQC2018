import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ProfilePage, User } from '../profile/profile';
import { OrdersPage } from '../orders/orders';
 
declare var google;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  user: User;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  profile = ProfilePage;
  orders = OrdersPage;

  constructor(
    public navCtrl: NavController,
    public navParam: NavParams, 
    public geolocation: Geolocation) {
      this.user = this.navParam.get('user')
    }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    let mapOptions = {
      center: {lat: 45.5576996, lng: -74.0104841},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var ctaLayer = new google.maps.KmlLayer({
      url: 'https://www.dropbox.com/s/8uptzsp2h4rwo3e/test.kml?dl=1',
      map: this.map
    });
    console.log(ctaLayer);
  }
}