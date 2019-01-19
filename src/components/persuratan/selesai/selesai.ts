import { Component, Input } from "@angular/core";
import { SelesaiModel } from "../../../models/selesai.model";
import { NavParams, NavController } from "ionic-angular";
import { SuratProvider } from "../../../providers/surat/surat";
import { ToastHelper } from "../../../helpers/toast-helper";
import { DatepickerProvider } from "../../../providers/datepicker/datepicker";
import { MomentHelper } from "../../../helpers/moment-helper";
import { LoaderHelper } from "../../../helpers/loader-helper";

@Component({
  selector: "selesai",
  templateUrl: "selesai.html"
})
export class Selesai {
  @Input() type: string;
  detail: any = "";
  errors: any = "";

  data: SelesaiModel = {
    tanggalSelesai: "",
    status: "",
    catatanSelesai: "",
    lokasiArsip: "",
    klasifikasiArsip: "Substantif",
    unit: "KEKAYAAN NEGARA" //jra unit
  };
  constructor(
    private suratProvider: SuratProvider,
    private toastHelper: ToastHelper,
    private navParam: NavParams,
    private datepicker: DatepickerProvider,
    private momentHelper: MomentHelper,
    private navCtrl: NavController,
    private loaderHelper: LoaderHelper
  ) {
    this.detail = this.navParam.get("detailNaskah");
  }

  selesai(data: SelesaiModel) {
    this.loaderHelper.createLoader()
    this.suratProvider.simpanSelesai(this.detail, data).subscribe(
      res => {
        this.loaderHelper.dismiss()
        this.toastHelper.present(res.messages)
        this.navCtrl.pop()
      },
      err => {
        this.loaderHelper.dismiss()
        if (err.errors) {
          this.errors = err.errors
        } else {
          this.toastHelper.presentError(err)
        }
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
