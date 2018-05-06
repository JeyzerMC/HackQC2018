import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('myMap') gmapElement: GoogleMapsComponent;
  constructor() { }

  ngOnInit() {
  }

  handleGardenClick(){
    this.gmapElement.gardensDisplay();
  }

  handleSecondClick(){
    this.gmapElement.secondDisplay();
  }

  handleThirdClick(){
    this.gmapElement.thirdDisplay();
  }

  handleFourthClick(){
    this.gmapElement.forthDisplay();
  }

  handleFifthClick(){
    this.gmapElement.fifthDisplay();
  }

  handleSixthClick(){
    this.gmapElement.sixthDisplay();
  }

  handleSeventhClick(){
    this.gmapElement.seventhDisplay();
  }

  handleEigthClick(){
    this.gmapElement.eigthDisplay();
  }

  handleNinthClick(){
    this.gmapElement.ninthDisplay();
  }

  handleTenthClick(){
    this.gmapElement.tenthDisplay();
  }

  handleEleventhClick(){
    this.gmapElement.eleventhDisplay();
  }
}
