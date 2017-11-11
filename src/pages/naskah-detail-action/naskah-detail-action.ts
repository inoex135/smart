import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { TimelineDummy } from "../../dummy/timeline.dummy";

@Component({
  selector: "page-naskah-detail-action",
  templateUrl: "naskah-detail-action.html"
})
export class NaskahDetailActionPage {
  actionData: object = {};
  items = TimelineDummy.items();

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.actionData = this.navParams.get("actionData");
  }
}
