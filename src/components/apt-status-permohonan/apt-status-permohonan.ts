import { Component } from '@angular/core';

/**
 * Generated class for the AptStatusPermohonanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'apt-status-permohonan',
  templateUrl: 'apt-status-permohonan.html'
})
export class AptStatusPermohonanComponent {

  text: string;

  constructor() {
    console.log('Hello AptStatusPermohonanComponent Component');
    this.text = 'Hello World';
  }

}
