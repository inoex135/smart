import { Component } from "@angular/core";
import { NavController, NavParams, IonicPage } from "ionic-angular";
import { NaskahNotifikasiProvider } from "../../providers/naskah-notifikasi/naskah-notifikasi";
import { LoaderHelper } from "../../helpers/loader-helper";

@IonicPage()
@Component({
  selector: "page-naskah-notifikasi",
  templateUrl: "naskah-notifikasi.html"
})
export class NaskahNotifikasiPage {
  notifications: any;
  constructor(
    public navCtrl: NavController,
    private notifProvider: NaskahNotifikasiProvider,
    private loaderHelper: LoaderHelper
  ) {}

  ionViewDidLoad() {
    this.getNotifikasi();
  }

  getNotifikasi() {
    this.loaderHelper.createLoader();
    this.notifProvider.getNotifikasi().subscribe(
      res => {
        this.notifications = res;
        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.errorHandleLoader(err.error_code, this.navCtrl);
      }
    );
  }

  statusRead(isRead: number) {
    return isRead === 0 ? "Unread" : "Read";
  }
}
