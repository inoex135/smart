import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NotificationDummy } from "../../dummy/notification.dummy";

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
}
