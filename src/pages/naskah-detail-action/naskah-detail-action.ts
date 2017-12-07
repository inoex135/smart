import { Component } from "@angular/core";
import { NavController, NavParams, IonicPage } from "ionic-angular";
@IonicPage()
@Component({
  selector: "page-naskah-detail-action",
  templateUrl: "naskah-detail-action.html"
})
export class NaskahDetailActionPage {
  actionData: object = {};
  naskahId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.naskahId = this.navParams.get("naskahId");
  }

  ionViewDidLoad() {
    this.actionData = this.navParams.get("actionData");
  }

  saveDisposisi() {}
}
