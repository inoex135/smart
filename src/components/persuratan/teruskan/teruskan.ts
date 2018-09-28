import { Component } from "@angular/core";
import { SuratTeruskan } from "../../../models/surat-teruskan";

import { NaskahMasukProvider } from "../../../providers/naskah-masuk/naskah-masuk";

import {
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from "ionic-angular";

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
    public naskahProvider: NaskahMasukProvider,
    private toast: ToastController
  ) {
    this.naskah.id = this.navParams.get("naskahId");
  }

  loader() {
    const loading = this.loading.create({
      content: "Please wait..."
    });
    return loading;
  }

  toaster(message: string) {
    const toast = this.toast.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });

    return toast;
  }

  teruskan() {
    const loading = this.loading.create({
      content: "Please wait..."
    });

    loading.present();

    // save data naskah untuk diteruskan
    this.naskahProvider.teruskan(this.naskah).subscribe(
      res => {
        this.toaster(res.message).present();
        this.isFinally(loading);
      },
      err => {
        this.toaster(err.message).present();
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
