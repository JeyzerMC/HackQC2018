import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PromptComponent  } from '../../components/prompt/prompt';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
