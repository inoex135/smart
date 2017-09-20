import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GrafikPersuratanPage } from "../grafik-persuratan/grafik-persuratan";
import { NaskahMasukPage } from "../naskah-masuk/naskah-masuk";

@Component({
  selector: "page-surat",
  templateUrl: "surat.html"
})
export class SuratPage {
  menus: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.menus = [
      { name: "Grafik", icon: "stats", component: GrafikPersuratanPage },
      { name: "Naskah Masuk", icon: "mail", component: NaskahMasukPage },
      { name: "Notifikasi", icon: "notifications", component: NaskahMasukPage }
    ];
  }

  ionViewDidLoad() {}

  openPage(page: any) {
    this.navCtrl.push(page.component);
  }
}
