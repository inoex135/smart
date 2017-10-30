import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-naskah-detail-action",
  templateUrl: "naskah-detail-action.html"
})
export class NaskahDetailActionPage {
  type: string = "";

  ACTION = {
    DISPOSISI: "disposisi",
    RIWAYAT: "riwayat",
    SELESAI: "selesai",
    TERUSKAN: "teruskan"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.type = this.navParams.get("type");
  }
}
