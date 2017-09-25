import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "teruskan",
  templateUrl: "teruskan.html"
})
export class Teruskan {
  public surat: string;
  public tujuan: string;
  public catatan: string;
  constructor() {}

  teruskan() {}
}
