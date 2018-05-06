import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  status1 : boolean = true;
  status2 : boolean = false;
  status3 : boolean = false;
  status4 : boolean = false;
  status5 : boolean = false;
  status6 : boolean = false;
  status7 : boolean = false;
  status8 : boolean = false;
  status9 : boolean = false;
  status11 : boolean = false;
  status10 : boolean = false;

  @ViewChild('myMap') gmapElement: GoogleMapsComponent;
  constructor() { }

  ngOnInit() {
  }

  handleGardenClick(){
    this.gmapElement.gardensDisplay();
    this.status1 = ! this.status1;
  }

  handleSecondClick(){
    this.gmapElement.secondDisplay();
    this.status2 = ! this.status2;
  }

  handleThirdClick(){
    this.gmapElement.thirdDisplay();
    this.status3 = ! this.status3;
  }

  handleFourthClick(){
    this.gmapElement.forthDisplay();
    this.status4 = ! this.status4;
  }

  handleFifthClick(){
    this.gmapElement.fifthDisplay();
    this.status5 = ! this.status5;
  }

  handleSixthClick(){
    this.gmapElement.sixthDisplay();
    this.status6 = ! this.status6;
  }

  handleSeventhClick(){
    this.gmapElement.seventhDisplay();
    this.status7 = ! this.status7;
  }

  handleEigthClick(){
    this.gmapElement.eigthDisplay();
    this.status8 = ! this.status8;
  }

  handleNinthClick(){
    this.gmapElement.ninthDisplay();
    this.status9 = ! this.status9;
  }

  handleTenthClick(){
    this.gmapElement.tenthDisplay();
    this.status10 = ! this.status10;
  }

  handleEleventhClick(){
    this.gmapElement.eleventhDisplay();
    this.status11 = ! this.status11;
  }
}
