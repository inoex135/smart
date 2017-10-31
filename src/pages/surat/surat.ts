import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GrafikPersuratanPage } from "../grafik-persuratan/grafik-persuratan";
import { NaskahMasukPage } from "../naskah-masuk/naskah-masuk";
import { NaskahNotifikasiPage } from "../naskah-notifikasi/naskah-notifikasi";
import { GrafikPersuratanKeluarPage } from "../grafik-persuratan-keluar/grafik-persuratan-keluar";
// import * as moment from "moment";
import * as moment from "moment-timezone";
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

  ionViewDidLoad() {
    this.setIntervalDate();
  }

  // when page leave, stop interval date
  ionViewWillLeave() {
    clearInterval(this.setIntervalDate());
  }

  setIntervalDate(): number {
    return setInterval(() => this.dateNow(), 60);
  }

  dateNow() {
    return moment.tz("Asia/Jakarta").format("HH:mm");
  }

  openPage(page: any) {
    this.navCtrl.push(page.component);
  }

  showBadge(menu: String) {
    const notification = "Notifikasi";
    return menu == notification ? true : false;
  }
}
