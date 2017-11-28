import { Component,Input } from '@angular/core';

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
 @Input() data: any;
  constructor() {
    console.log('Hello AptStatusPermohonanComponent Component');
    this.text = 'Hello World';
  }

}
