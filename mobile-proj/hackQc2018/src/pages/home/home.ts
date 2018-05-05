import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
<<<<<<< HEAD
import { Geolocation } from '@ionic-native/geolocation';

=======
import { ProfilePage } from '../profile/profile';
import { OrdersPage } from '../orders/orders';
 
>>>>>>> 377bacf4cabee4e9961b483e6e898aa796f821a5
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
    public navCtrl: NavController, 
    public geolocation: Geolocation) {}
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
    
    let latLng = new google.maps.LatLng(45.5576996,-74.0104841);
 
    let mapOptions = {
      center: {lat: 41.876, lng: -87.624},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // var agriculturesAreas = new google.maps.KmlLayer({
    //   url: 'https://www.dropbox.com/s/4bi3gxdbc898ipp/zone-agricole.kml?dl=1',
    //   map: this.map
    // });

    // this.geolocation.getCurrentPosition().then((resp) => {      
    //   this.map.setCenter(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)); 
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
    this.map.setCenter(new google.maps.LatLng(45.4946761,-73.5644848));
     var marker = new google.maps.Marker({
      map: this.map,
      position: this.map.center,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3.5,
        fillColor: "#000000",
        fillOpacity: 0.4,
        strokeWeight: 0.4
      }
    });
    
    // Add circle overlay and bind to marker
    var circle = new google.maps.Circle({
      map: this.map,
      radius: 5000,    // 10 miles in metres
      fillColor: '#AA0000',
      clickable: false
    });
    circle.bindTo('center', marker, 'position');
    

    var communityGarden = new google.maps.KmlLayer({
      url: 'https://www.dropbox.com/s/8uptzsp2h4rwo3e/test.kml?dl=1',
      map: this.map,
    });
  }
}