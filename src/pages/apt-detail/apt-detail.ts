import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { AptDetailActionPage } from "../apt-detail-action/apt-detail-action";
import { AptAction } from "../../constant/apt-action.enum";
@Component({
  selector: "page-apt-detail",
  templateUrl: "apt-detail.html"
})
export class AptDetailPage {
  detail: any;
  ACTION = AptAction;

  constructor(private navParams: NavParams, private navCtrl: NavController) {}

  ionViewDidLoad() {
    this.detail = this.navParams.get("detail");
  }

  detailAction(action: string) {
    this.navCtrl.push(AptDetailActionPage, { action: action });
  }
}
