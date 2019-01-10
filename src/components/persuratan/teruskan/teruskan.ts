import { Component } from "@angular/core";
import { SuratTeruskan } from "../../../models/surat-teruskan";
import { MasterUnitProvider } from "../../../providers/master-unit/master-unit";
import { AutoCompleteComponent } from "ionic2-auto-complete";
import { NaskahMasukProvider } from "../../../providers/naskah-masuk/naskah-masuk";

import {
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { ToastHelper } from "../../../helpers/toast-helper";

@Component({
  selector: "teruskan",
  templateUrl: "teruskan.html"
})
export class Teruskan {
  naskah: SuratTeruskan = {
    id: 0,
    tujuan: "",
    alasan: "",
    catatan: ""
  };

  constructor(
    public loading: LoadingController,
    public nav: NavController,
    public navParams: NavParams,
    private masterUnit: MasterUnitProvider,
    public naskahProvider: NaskahMasukProvider,
    private toast: ToastHelper
  ) {
    this.naskah.id = this.navParams.get("naskahId");
  }

  loader() {
    const loading = this.loading.create({
      content: "Please wait..."
    });
    return loading;
  }

  teruskan() {
    const loading = this.loading.create({
      content: "Please wait..."
    });

    loading.present();

    // save data naskah untuk diteruskan
    this.naskahProvider.teruskan(this.naskah).subscribe(
      res => {
        this.toast.present(res.message)
        this.isFinally(loading)
      },
      err => {
        this.toast.presentError(err.message)
        this.isFinally(loading);
      }
    );
  }

  isFinally(loading: any) {
    loading.dismiss();
    this.nav.pop();
  }

  setTujuan(unit, event: any) {
    return (this.naskah.tujuan = event.kode_utuh);
  }
}
