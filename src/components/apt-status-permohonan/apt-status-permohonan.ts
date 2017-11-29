import { Component, Input } from "@angular/core";

@Component({
  selector: "apt-status-permohonan",
  templateUrl: "apt-status-permohonan.html"
})
export class AptStatusPermohonanComponent {
  @Input() data: any;
  constructor() {}
}
