import { Component } from '@angular/core';

/**
 * Generated class for the AptPratinjauComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'apt-pratinjau',
  templateUrl: 'apt-pratinjau.html'
})
export class AptPratinjauComponent {

  text: string;

  constructor() {
    console.log('Hello AptPratinjauComponent Component');
    this.text = 'Hello World';
  }

}
