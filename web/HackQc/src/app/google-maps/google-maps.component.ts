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
  btnOneChecked: boolean = true;
  btnTwoChecked: boolean = false;
  btnThreeChecked: boolean = false;
  btnFourChecked: boolean = false;
  btnFiveChecked: boolean = false;
  btnSixChecked: boolean = false;
  btnSevenChecked: boolean = false;
  btnEightChecked: boolean = false;
  btnNineChecked: boolean = false;
  btnTenChecked: boolean = false;
  btnEleventChecked: boolean = false;
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
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);

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

    this.toggleLayers();
  }

  toggleLayers(){
    if (this.btnOneChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/8uptzsp2h4rwo3e/test.kml?dl=1',
        map: this.map
      });
    }

    if (this.btnTwoChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/nd4oyo0uqa9ysm6/a0000000b.kml?dl=1',
          map: this.map
      });
    }

    if (this.btnThreeChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/xf2c9fsnfsyvqy3/a0000000c.kml?dl=1',
          map: this.map
      });
    }

    if (this.btnFourChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/r2lmke2tkniggoe/Surface.kml?dl=1',
          map: this.map
      });
    }

    if (this.btnFiveChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/s2fgnhy4wjfawn2/ecoterritoires.kml?dl=1',
          map: this.map
      });
    }

    if (this.btnSixChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/e32373ofogx5ozl/a00000022.kml?dl=1',
          map: this.map
      });
    }

    if (this.btnSevenChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/xt155wsr8hp3pkd/affectationpu.kml?dl=1',
          map: this.map
      });
    }

    if (this.btnEightChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/398slwv5m5y3j99/secteursdensification.kml?dl=1',
          map: this.map
      });
    }

    if (this.btnNineChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/yast655cdfksxd9/ilotschaleur.kml?dl=1',
          map: this.map
      });
    }

    if (this.btnTenChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/v3mn2l98wb7f52y/indexplaineinondable.kml?dl=1',
          map: this.map
      });
    }

    if (this.btnEleventChecked){
      var ctaLayer = new google.maps.KmlLayer({
        url: 'https://www.dropbox.com/s/2cvehg3pslvd5ne/perimurb.kml?dl=1',
          map: this.map
      });
    }
  }

  public gardensDisplay() {
    // Jardins répertoriés
    this.btnOneChecked = !this.btnOneChecked;
    this.setPosition();
  }

  public secondDisplay(){
    // Territoires contaminés
    this.btnTwoChecked = !this.btnTwoChecked;
    this.setPosition();
  }

  public thirdDisplay(){
    // Zones à danger
    this.btnThreeChecked = !this.btnThreeChecked;
    this.setPosition();
  }

  public forthDisplay(){
    //Surfaces contaminées
    this.btnFourChecked = !this.btnFourChecked;
    this.setPosition();
  }

  public fifthDisplay(){
    // Écoterritoires
    this.btnFiveChecked = !this.btnFiveChecked;
    this.setPosition();
  }

  public sixthDisplay(){
    // Pesticides
    this.btnSixChecked = !this.btnSixChecked;
    this.setPosition();
  }

  public seventhDisplay(){
    // Pesticides
    this.btnSevenChecked = !this.btnSevenChecked;
    this.setPosition();
  }

  public eigthDisplay(){
    // Pesticides
    this.btnEightChecked = !this.btnEightChecked;
    this.setPosition();
  }

  public ninthDisplay(){
    // Pesticides
    this.btnNineChecked = !this.btnNineChecked;
    this.setPosition();
  }

  public tenthDisplay(){
    // Pesticides
    this.btnTenChecked = !this.btnTenChecked;
    this.setPosition();
  }
  public eleventhDisplay(){
    // Pesticides
    this.btnEleventChecked = !this.btnEleventChecked;
    this.setPosition();
  }

}