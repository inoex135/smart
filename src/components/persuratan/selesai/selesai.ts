import { Component, Input } from "@angular/core";
import { SelesaiModel } from "../../../models/selesai.model";
import { NavParams, NavController } from "ionic-angular";
import { SuratProvider } from "../../../providers/surat/surat";
import { ToastHelper } from "../../../helpers/toast-helper";
import { DatepickerProvider } from "../../../providers/datepicker/datepicker";
import { MomentHelper } from "../../../helpers/moment-helper";

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
    private navParam: NavParams,
    private datepicker: DatepickerProvider,
    private momentHelper: MomentHelper,
    private navCtrl: NavController
  ) {
    this.detail = this.navParam.get("detailNaskah");
  }

  selesai(data: SelesaiModel) {
    this.suratProvider.simpanSelesai(this.detail.id, data).subscribe(
      res => {
        this.toastHelper.present(res.messages);
        this.navCtrl.pop();
      },
      err => {
        err.errors.forEach(res => {
          this.toastHelper.present(res.messages);
        });
        console.log(err);
      }
    );
  }

  async setTanggalSelesai() {
    const tanggalSelesai = await this.datepicker.datePickerData("date");
    this.data.tanggalSelesai = this.momentHelper.convertIsoTo(
      tanggalSelesai,
      "DD-MM-YYYY"
    );
  }
}
