import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { AptDetailActionPage } from "../apt-detail-action/apt-detail-action";

@Component({
  selector: "page-apt-detail",
  templateUrl: "apt-detail.html"
})
export class AptDetailPage {
  detail: any;

  readonly ACTION = {
    PRATINJAU: "PRATINJAU",
    VERIFIKASI: "VERIFIKASI",
    CETAK: "CETAK"
  };

  constructor(private navParams: NavParams, private navCtrl: NavController) {}

  ionViewDidLoad() {
    this.detail = this.navParams.get("detail");
  }

  detailAction(action: string) {
    this.navCtrl.push(AptDetailActionPage);
  }
}
