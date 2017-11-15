import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NotificationDummy } from "../../dummy/notification.dummy";
import { AptDetailPage } from "../apt-detail/apt-detail";

@IonicPage()
@Component({
  selector: "page-apt-notifikasi",
  templateUrl: "apt-notifikasi.html"
})
export class AptNotifikasiPage {
  notifications: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.notifications = NotificationDummy.lists();
  }

  goToAptDetail(aptId: number) {
    this.navCtrl.push(AptDetailPage, { aptId: aptId });
  }
}
