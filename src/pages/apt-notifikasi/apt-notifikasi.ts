import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";

@IonicPage()
@Component({
  selector: "page-apt-notifikasi",
  templateUrl: "apt-notifikasi.html"
})
export class AptNotifikasiPage {
  notifications: any[] = [];

  constructor(
    public navCtrl: NavController,
    private aptProvider: AptProvider
  ) {}

  ionViewDidLoad() {
    this.getListNotification();
  }

  getListNotification() {
    this.aptProvider
      .getListNotification()
      .subscribe(res => (this.notifications = res), err => console.log(err));
  }

  goToAptDetail(aptId: number) {
    this.navCtrl.push("AptDetailPage", { aptId: aptId });
  }

  statusRead(isRead: number) {
    return isRead === 0 ? "Unread" : "Read";
  }
}
