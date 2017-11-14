import { Component } from "@angular/core";
import { NavController, NavParams, IonicPage } from "ionic-angular";
import { NaskahNotifikasiProvider } from "../../providers/naskah-notifikasi/naskah-notifikasi";

@IonicPage()
@Component({
  selector: "page-naskah-notifikasi",
  templateUrl: "naskah-notifikasi.html"
})
export class NaskahNotifikasiPage {
  notifications: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private notifProvider: NaskahNotifikasiProvider
  ) {}

  ionViewDidLoad() {
    this.notifications = this.getNotifikasi();
  }

  getNotifikasi() {
    return this.notifProvider.getNotifikasi();
  }
}
