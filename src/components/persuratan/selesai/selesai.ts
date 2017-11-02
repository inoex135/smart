import { Component, Input } from "@angular/core";
import { SelesaiModel } from "../../../models/selesai.model";

@Component({
  selector: "selesai",
  templateUrl: "selesai.html"
})
export class Selesai {
  @Input() type: string;

  data: SelesaiModel = {
    tanggalSelesai: "",
    status: "any",
    catatanSelesai: "",
    lokasiArsip: "",
    klasifikasiArsip: "",
    unit: ""
  };

  selesai(data: SelesaiModel) {
    console.log(data);
  }
}
