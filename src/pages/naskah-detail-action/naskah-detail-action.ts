import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { TimelineDummy } from "../../dummy/timeline.dummy";
import { TimelineType } from "../../constant/TimelineType";

@Component({
  selector: "page-naskah-detail-action",
  templateUrl: "naskah-detail-action.html"
})
export class NaskahDetailActionPage {
  actionData: object = {};
  items = TimelineDummy.items();
  type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = TimelineType.RIWAYAT;
  }

  ionViewDidLoad() {
    this.actionData = this.navParams.get("actionData");
  }
}
