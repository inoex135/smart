import { Component, Input } from "@angular/core";
import { APT_INDIKATOR } from "../../constant/apt-indikator";

@Component({
  selector: "apt-indikator-button",
  templateUrl: "apt-indikator-button.html"
})
export class AptIndikatorButtonComponent {
  @Input() status: string = "";

  readonly INDIKATOR: any = APT_INDIKATOR;

  constructor() {}
}
