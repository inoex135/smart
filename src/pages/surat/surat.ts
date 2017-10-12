import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GrafikPersuratanPage } from "../grafik-persuratan/grafik-persuratan";
import { NaskahMasukPage } from "../naskah-masuk/naskah-masuk";
import { NaskahNotifikasiPage } from "../naskah-notifikasi/naskah-notifikasi";
import { GrafikPersuratanKeluarPage } from "../grafik-persuratan-keluar/grafik-persuratan-keluar";

@Component({
  selector: "page-surat",
  templateUrl: "surat.html"
})
export class SuratPage {
  menus: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.menus = [
      {
        name: "Grafik Surat Masuk",
        icon: "stats",
        component: GrafikPersuratanPage
      },
      {
        name: "Grafik Surat Keluar",
        icon: "stats",
        component: GrafikPersuratanKeluarPage
      },
      { name: "Naskah Masuk", icon: "folder", component: NaskahMasukPage },
      { name: "Notifikasi", icon: "mail", component: NaskahNotifikasiPage }
    ];
  }

  ionViewDidLoad() {}

  openPage(page: any) {
    this.navCtrl.push(page.component);
  }

  showBadge(menu: String) {
    const notification = "Notifikasi";
    return menu == notification ? true : false;
  }
}
