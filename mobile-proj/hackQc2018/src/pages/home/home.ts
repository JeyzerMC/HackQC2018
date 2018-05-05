import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 
declare var google;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  username: string;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
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
      url: 'https://unzip-online.com/en/Download/File?index=0&file=4tECH8iulXnNS7nFk2x3wg%3D%3D',
      // url: 'http://googlemaps.github.io/kml-samples/kml/Placemark/placemark.kml',
      map: this.map
    });

  }
}