import { Component, Input } from "@angular/core";
import { SelesaiModel } from "../../../models/selesai.model";
import { NavParams } from "ionic-angular";

@Component({
  selector: "selesai",
  templateUrl: "selesai.html"
})
export class Selesai {
  @Input() type: string;
  detail: any = "";

  data: SelesaiModel = {
    tanggalSelesai: "",
    status: "any",
    catatanSelesai: "",
    lokasiArsip: "",
    klasifikasiArsip: "",
    unit: ""
  };
  constructor(private navParam: NavParams) {
    this.detail = this.navParam;
  }

  selesai(data: SelesaiModel) {
    console.log(data);
  }
}
