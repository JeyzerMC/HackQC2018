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
    // let latLng = new google.maps.LatLng(45.5073,-73.6273);
    // let latLng = new google.maps.LatLng(37.06, -95.68);
 
    let mapOptions = {
      center: {lat: 41.876, lng: -87.624},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var ctaLayer = new google.maps.KmlLayer({
      url: 'https://www.dropbox.com/s/8uptzsp2h4rwo3e/test.kml?dl=1',
      // url: 'http://googlemaps.github.io/kml-samples/kml/Placemark/placemark.kml',
      map: this.map
    });
    console.log(ctaLayer);
  }
}