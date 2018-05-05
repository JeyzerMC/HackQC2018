import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { OrdersPage } from '../orders/orders';
 
declare var google;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  username: string;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  profile = ProfilePage;
  orders = OrdersPage;

  constructor(
    public navCtrl: NavController) {}
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
}