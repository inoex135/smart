import { Component, Input } from "@angular/core";
import { SelesaiModel } from "../../../models/selesai.model";
import { NavParams } from "ionic-angular";
import { SuratProvider } from "../../../providers/surat/surat";
import { ToastHelper } from "../../../helpers/toast-helper";

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
  constructor(
    private suratProvider: SuratProvider,
    private toastHelper: ToastHelper,
    private navParam: NavParams
  ) {
    this.detail = this.navParam.get("detailNaskah");
  }

  selesai(data: SelesaiModel) {
    this.suratProvider.simpanSelesai(this.detail.data.naskahId, data).subscribe(
      res => {
        this.toastHelper.present(res.messages);
      },
      err => {
        console.log(err);
      }
    );
  }
}
