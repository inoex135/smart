import { Component,Input } from '@angular/core';

/**
 * Generated class for the ChecklistDokumenPendukungComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'checklist-dokumen-pendukung',
  templateUrl: 'checklist-dokumen-pendukung.html'
})
export class ChecklistDokumenPendukungComponent {

  text: string;
   @Input() data: any;
  constructor() {
    console.log('data :  ');
    this.text = 'Hello World';
  }

}
