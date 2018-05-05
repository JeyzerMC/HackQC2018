import { Component, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  selector: 'prompt',
  templateUrl: 'prompt.html'
})
export class PromptComponent {

  @Input() text: string;

  constructor(public alertCtrl: AlertController) {}

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
