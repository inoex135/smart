import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { AptDetailActionPage } from "../apt-detail-action/apt-detail-action";
import { AptAction } from "../../constant/apt-action";
import { AptProvider } from "../../providers/apt/apt";

@Component({
  selector: "page-apt-detail",
  templateUrl: "apt-detail.html"
})
export class AptDetailPage {
  detail: any;
  ACTION = AptAction;

  aptDetail: any = {};

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private aptProvider: AptProvider
  ) {}

  ionViewDidLoad() {
    this.detail = this.navParams.get("detail");
  }

  getDetailApt() {
    this.aptProvider.getDetailApt(this.detail.id).subscribe(
      res => (this.aptDetail = res),
      err => {
        console.log(err);
      }
    );
  }

  detailAction(action: string) {
    this.navCtrl.push(AptDetailActionPage, { action: action });
  }
}
