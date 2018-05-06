import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  mapProp: any;
  constructor() { }

  ngOnInit() {
    this.mapProp = {
      center: new google.maps.LatLng(45.4946761,-73.5622961),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    this.setPosition();
  }

  setPosition(){
    var marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(45.4946761,-73.5622961),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3.5,
        fillColor: "#000000",
        fillOpacity: 0.2,
        strokeWeight: 0.1
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
  }

  public gardensDisplay() {
    // Jardins répertoriés
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
      url: 'https://www.dropbox.com/s/8uptzsp2h4rwo3e/test.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

  public secondDisplay(){
    // Territoires contaminés
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/nd4oyo0uqa9ysm6/a0000000b.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

  public thirdDisplay(){
    // Zones à danger
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/xf2c9fsnfsyvqy3/a0000000c.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

  public forthDisplay(){
    //Surfaces contaminées
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/r2lmke2tkniggoe/Surface.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

  public fifthDisplay(){
    // Écoterritoires
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/s2fgnhy4wjfawn2/ecoterritoires.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

  public sixthDisplay(){
    // Pesticides
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/e32373ofogx5ozl/a00000022.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

  public seventhDisplay(){
    // Pesticides
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/xt155wsr8hp3pkd/affectationpu.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

  public eigthDisplay(){
    // Pesticides
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/xt155wsr8hp3pkd/affectationpu.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

  public ninthDisplay(){
    // Pesticides
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/xt155wsr8hp3pkd/affectationpu.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

  public tenthDisplay(){
    // Pesticides
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/xt155wsr8hp3pkd/affectationpu.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }
  public eleventhDisplay(){
    // Pesticides
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
    var ctaLayer = new google.maps.KmlLayer({
    url: 'https://www.dropbox.com/s/xt155wsr8hp3pkd/affectationpu.kml?dl=1',
      map: this.map
    });
    this.setPosition();
  }

}