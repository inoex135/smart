import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "naskah-modal-download",
  templateUrl: "naskah-modal-download.html"
})
export class NaskahModalDownloadComponent {
  show: boolean = false;
  @Input() files: Array<any> = [];
  @Output() downloadFile: EventEmitter<any> = new EventEmitter();

  constructor() {}

  download(fileData: Event) {
    this.downloadFile.emit(fileData);
  }

  present() {
    this.show = true;
  }

  dismiss() {
    this.show = false;
  }
}
