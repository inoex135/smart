import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";
import { LoaderHelper } from "../../helpers/loader-helper";
import { AptDetailPage } from "../apt-detail/apt-detail";

@IonicPage()
@Component({
  selector: "page-apt-notifikasi",
  templateUrl: "apt-notifikasi.html"
})
export class AptNotifikasiPage {
  notifications: any[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    private aptProvider: AptProvider,
    private loader: LoaderHelper
  ) {}

  ionViewWillEnter() {
    this.getListNotification();
  }

  getListNotification() {
    this.loader.createLoader();

    this.aptProvider.getListNotification().subscribe(
      res => {
        this.notifications = res;
        this.loader.dismiss();
      },
      err => this.loader.dismiss()
    );
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.aptProvider.getListNotification(this.page).subscribe(res => {
        for (var index = 0; index < res.length; index++) {
          this.notifications.push(res[index]);
        }
      });
      infiniteScroll.complete();
    }, 1000);
  }

  goToAptDetail(aptId: number) {
    this.navCtrl.push(AptDetailPage.TAG, { itemId: aptId });
  }

  statusRead(isRead: number) {
    return isRead === 0 ? "Belum dibaca" : "Sudah dibaca";
  }
}
