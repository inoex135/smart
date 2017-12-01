import { Component, Input } from "@angular/core";

@Component({
  selector: "checklist-dokumen-pendukung",
  templateUrl: "checklist-dokumen-pendukung.html"
})
export class ChecklistDokumenPendukungComponent {
  //menampilkan list dokumen pendukung
  @Input() data: any;
  constructor() {}
}
