import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "naskah-modal-terima",
  templateUrl: "naskah-modal-terima.html"
})
export class NaskahModalTerimaComponent {
  @Output() terimaNaskah = new EventEmitter<string>();
  constructor() {}

  callTerimaNaskah() {
    this.terimaNaskah.next("event");
  }
}
