import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AptAction } from "../../constant/apt-action.enum";
@Component({
  selector: "page-apt-detail-action",
  templateUrl: "apt-detail-action.html"
})
export class AptDetailActionPage {
  action: string;

  readonly APT_ACTION = AptAction;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.action = this.navParams.get("action");
  }
}
