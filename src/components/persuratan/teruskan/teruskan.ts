import { Component } from "@angular/core";
import { SuratTeruskan } from "../../../models/surat-teruskan";
import { LoadingController, NavController } from "ionic-angular";
import { NaskahMasukProvider } from "../../../providers/naskah-masuk/naskah-masuk";

@Component({
  selector: "teruskan",
  templateUrl: "teruskan.html"
})
export class Teruskan {
  naskah: SuratTeruskan = {
    tujuan: "",
    alasan: "",
    catatan: ""
  };

  constructor(
    public loading: LoadingController,
    public nav: NavController,
    public naskahProvider: NaskahMasukProvider
  ) {}

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
