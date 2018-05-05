import { Component } from '@angular/core';

/**
 * Generated class for the PromptComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'prompt',
  templateUrl: 'prompt.html'
})
export class PromptComponent {

  text: string;

  constructor() {
    console.log('Hello PromptComponent Component');
    this.text = 'Hello World';
  }

}
