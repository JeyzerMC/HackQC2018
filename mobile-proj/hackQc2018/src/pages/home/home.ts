import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import { LandPage } from '../land/land';
import { User, ProfilePage } from '../profile/profile';
import { OrdersPage } from '../orders/orders';
import { CENTROIDS, API_LAND_URL } from '../../constants';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';
import Web3 from "web3";

declare var google;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  user: User;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  orders = OrdersPage;
  profile = ProfilePage;

  land = LandPage;
  web3;
  lands;
 
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public platform: Platform,
    public httpNative: HTTP,
    public httpBrowser: HttpClient) {}
  
  ionViewDidLoad(){
    this.lands = [];

    // if (typeof this.web3 !== 'undefined') {
    //   this.web3 = new Web3(this.web3.currentProvider);
    // } else {
    this.web3  = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));;
    //}
    // var accounts = [];
    this.web3.eth.getAccounts().then((accounts) => {
      const contract = new this.web3.eth.Contract([
          {
            "constant": true,
            "inputs": [],
            "name": "seller",
            "outputs": [
              {
                "name": "_id",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "product_name",
                "type": "string"
              },
              {
                "name": "product_quantity",
                "type": "uint256"
              },
              {
                "name": "price_unity",
                "type": "uint256"
              }
            ],
            "name": "add_product",
            "outputs": [],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "product_name",
                "type": "string"
              },
              {
                "name": "quantity",
                "type": "uint256"
              }
            ],
            "name": "Buy",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
      ], '0xe9d09feae7649857757dc01f5619466c807af9c6');
      var i = 0;
      for (const centroid of CENTROIDS) {
        this.lands.push({
          lng: centroid[1],
          lat: centroid[0],
          id: `Land${i}`
        });
       
        console.log(this.lands)
        contract.methods.add_product(this.lands[i].id, 1, 5)
        .send({from: accounts[0], gas: 3000000})
        .then(console.log);

        i++;

      }
    });   

    this.loadMap();
  }

  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat() / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng() - checkPoint.lng()) * kx;
    var dy = Math.abs(centerPoint.lat() - checkPoint.lat()) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }
  loadMap(){
    // console.log(CENTROIDS);
    let latLng = new google.maps.LatLng(45.5576996,-74.0104841);
 
    let mapOptions = {
      center: latLng,
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
      fillOpacity: 0.1,
      strokeWeight: 0.1,
      clickable: false
    });
    circle.bindTo('center', marker, 'position');
    

    var communityGarden = new google.maps.KmlLayer({
      url: 'https://www.dropbox.com/s/8uptzsp2h4rwo3e/test.kml?dl=1',
      map: this.map,
      suppressInfoWindows: true 
    });

    communityGarden.addListener('click', (kmlEvent) => {
      var i = 0
      for(; i < CENTROIDS.length; ++i){
        if(this.arePointsNear(kmlEvent.latLng, new google.maps.LatLng(CENTROIDS[i][1], CENTROIDS[i][0]), 3.0))
        {
          break;
        }
          
      }
      var lat = CENTROIDS[i][1];
      var lng = CENTROIDS[i][0];
      var owned = false;
      if (this.platform.is('cordova')) {
        this.httpNative.get(`${API_LAND_URL}/SearchBylocation?posX=${lat}&posY=${lng}`, {}, {})
        .then(resp => {
          if (resp.status == 404){
              this.showAlert('Land error', 'unknown');
          }
          else{
            if(resp.data.json()['renterId'] == ""){
              this.alertCtrl.create({
                title: 'Rent this garden',
                message: 'Would you like to rent the garden situated at for price: ...',
                buttons:
                [
                  {
                    text: 'Yes',
                    handler: data =>{
                      this.navCtrl.push(this.land);
                    }
                  },
                  {
                    text: 'No',
                    handler: data => {
        
                    }
                  }
                ]
              }).present();
            }
          }
        })
        .catch((err) => {this.showAlert('error', err); console.error(err)})
        } else {
          this.httpBrowser.get(`${API_LAND_URL}/SearchBylocation?posX=${lat}&posY=${lng}`, {}).toPromise().then(resp => {
            console.log(resp);
            if ((resp as any).status == 404){
                this.showAlert('Land error', 'unknown');
            }
            else{
              console.log(resp);
              if(resp['renterId'] == ""){
                this.alertCtrl.create({
                  title: 'Rent this garden',
                  message: 'Would you like to rent the garden situated at for price: ...',
                  buttons:
                  [
                    {
                      text: 'Yes',
                      handler: data =>{
                        this.navCtrl.push(this.land);
                      }
                    },
                    {
                      text: 'No',
                      handler: data => {
          
                      }
                    }
                  ]
                }).present();
              }
            }
          })
          .catch((err) => {this.showAlert('error', err); console.error(err)})
        }
      
    });
    
  }
}