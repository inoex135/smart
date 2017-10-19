import { Component } from "@angular/core";

import { Platform, NavParams, ViewController } from "ionic-angular";
@Component({
  selector: "modal-content-page",
  templateUrl: "modal-content.html"
})
export class ModalContentPage {
  private actionType: String = "disposisi";

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.actionType = this.params.get("actionType");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
