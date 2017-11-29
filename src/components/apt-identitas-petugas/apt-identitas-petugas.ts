import { Component,Input } from '@angular/core';

/**
 * Generated class for the AptIdentitasPetugasComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'apt-identitas-petugas',
  templateUrl: 'apt-identitas-petugas.html'
})
export class AptIdentitasPetugasComponent {

  text: string;
@Input() data: any;
  constructor() {
    console.log('Hello AptIdentitasPetugasComponent Component');
    this.text = 'Hello World';
  }

}
