import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { NaskahNotifikasiProvider } from "../../providers/naskah-notifikasi/naskah-notifikasi";
import { LoaderHelper } from "../../helpers/loader-helper";

@IonicPage()
@Component({
  selector: "page-naskah-notifikasi",
  templateUrl: "naskah-notifikasi.html"
})
export class NaskahNotifikasiPage {
  notifications: any;
  page: number = 0;
  items = [];
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

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.notifProvider.getNotifikasi(this.page).subscribe(res => {
        for (var index = 0; index < res.length; index++) {
          this.notifications.push(res[index]);
        }
      });
      infiniteScroll.complete();
    }, 1000);
  }

  statusRead(isRead: number) {
    return isRead === 0 ? "Unread" : "Read";
  }

  detailNotifikasi(naskahId: number) {
    this.navCtrl.push("NaskahMasukDetailPage", { naskahId: naskahId });
  }
}
