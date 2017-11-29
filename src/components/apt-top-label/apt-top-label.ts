import { Component,Input } from '@angular/core';

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

 @Input() data: any;
  constructor() {
  }

}
