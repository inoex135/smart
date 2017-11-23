import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "naskah-modal-download",
  templateUrl: "naskah-modal-download.html"
})
export class NaskahModalDownloadComponent {
  show: boolean = false;

  @Output() downloadFile: EventEmitter<any> = new EventEmitter();

  constructor() {}

  download(event: Event) {
    this.downloadFile.emit(event);
  }

  present() {
    this.show = true;
  }

  dismiss() {
    this.show = false;
  }
}
