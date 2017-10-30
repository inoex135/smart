import { Component, Input } from "@angular/core";

@Component({
  selector: "selesai",
  templateUrl: "selesai.html"
})
export class Selesai {
  @Input() type: string;
  selesai() {}
}
