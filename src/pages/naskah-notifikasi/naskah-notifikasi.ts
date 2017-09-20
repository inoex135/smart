import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { NaskahNotifikasiProvider } from "../../providers/naskah-notifikasi/naskah-notifikasi";

/**
 * Generated class for the NaskahNotifikasiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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
    console.log(this.notifications);
  }

  getNotifikasi() {
    return this.notifProvider.getNotifikasi();
  }
}
