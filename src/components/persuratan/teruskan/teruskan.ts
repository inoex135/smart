import { Component } from "@angular/core";
import { SuratTeruskan } from "../../../models/surat-teruskan";
import { LoadingController, NavController } from "ionic-angular";

@Component({
  selector: "teruskan",
  templateUrl: "teruskan.html"
})
export class Teruskan {
  surat: SuratTeruskan = {
    tujuan: "",
    alasan: "",
    catatan: ""
  };

  constructor(public loading: LoadingController, public nav: NavController) {}

  teruskan() {
    const loading = this.loading.create({
      content: "Please wait..."
    });

    loading.present();
    console.log(this.surat);
    loading.dismiss();
  }
}
