import { Component } from '@angular/core';

/**
 * Generated class for the AptTopLabelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'apt-top-label',
  templateUrl: 'apt-top-label.html'
})
export class AptTopLabelComponent {

  text: string;

  constructor() {
    console.log('Hello AptTopLabelComponent Component');
    this.text = 'Hello World';
  }

}
