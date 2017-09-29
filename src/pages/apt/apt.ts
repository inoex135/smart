import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
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
    private aptProvider: AptProvider
  ) {
    this.items = this.aptProvider.getPermohonanList();
  }

  ionViewDidLoad() {}

  detailApt() {
    this.navCtrl.push(AptDetailPage);
  }
  download() {}
}
