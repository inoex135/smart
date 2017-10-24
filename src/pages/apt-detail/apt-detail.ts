import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";

@Component({
  selector: "page-apt-detail",
  templateUrl: "apt-detail.html"
})
export class AptDetailPage {
  detail: any;
  constructor(private navParams: NavParams) {}

  ionViewDidLoad() {
    this.detail = this.navParams.get("detail");
  }
}
