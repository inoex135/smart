import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello ChecklistDokumenPendukungComponent Component');
    this.text = 'Hello World';
  }

}
