import { Component } from "@angular/core";
import { SuratTeruskan } from "../../../models/surat-teruskan";
import { LoadingController, NavController } from "ionic-angular";
import { NaskahMasukProvider } from "../../../providers/naskah-masuk/naskah-masuk";
import {  NavParams } from "ionic-angular";

@Component({
  selector: "teruskan",
  templateUrl: "teruskan.html"
})
export class Teruskan {
  naskah: SuratTeruskan = {
    id:0,
    tujuan: "",
    alasan: "",
    catatan: ""
  };

  constructor(
    public loading: LoadingController,
    public nav: NavController,
    public navParams: NavParams,
    public naskahProvider: NaskahMasukProvider
  ) {

  this.naskah.id = this.navParams.get("naskahId");
  }

  teruskan() {
    const loading = this.loading.create({
      content: "Please wait..."
    });

    loading.present();

    // save data naskah untuk diteruskan
    this.naskahProvider.teruskan(this.naskah).subscribe(
      res => {
        console.log(res);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
}
