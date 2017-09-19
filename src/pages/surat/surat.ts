import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GrafikPersuratanPage } from "../grafik-persuratan/grafik-persuratan";
import { NaskahMasukPage } from "../naskah-masuk/naskah-masuk";

@Component({
  selector: "page-surat",
  templateUrl: "surat.html"
})
export class SuratPage {
  params: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params.data = [
      { page: GrafikPersuratanPage, title: "Grafik" },
      { page: NaskahMasukPage, title: "Naskah Masuk" },
      { page: GrafikPersuratanPage, title: "Notifikasi" }
    ];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SuratPage");
  }
}
