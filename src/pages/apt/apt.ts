import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";
import { AptDetailPage } from "../apt-detail/apt-detail";

@Component({
  selector: "page-apt",
  templateUrl: "apt.html"
})
export class AptPage {
  params: any = {};
  items: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private aptProvider: AptProvider,
    private loadingCtrl: LoadingController
  ) {
    this.items = this.aptProvider.getPermohonanList();
  }

  ionViewDidLoad() {}

  detailApt() {
    this.navCtrl.push(AptDetailPage);
  }

  download() {
    const loader = this.loadingCtrl.create({
      content: "Wait download....",
      spinner: "dots"
    });
    loader.present();

    this.aptProvider
      .download()
      .then(res => {
        // alert("success");
        loader.dismiss();
      })
      .catch(err => {
        // alert("error");
        loader.dismiss();
      });
  }
}
