import { Component, Input } from "@angular/core";
import * as moment from "moment-timezone";
import { NavController } from "ionic-angular";

@Component({
  selector: "pemberitahuan",
  templateUrl: "pemberitahuan.html"
})
export class PemberitahuanComponent {
  constructor(private navCtrl: NavController) {}

  @Input() redirectComponent: string = "";

  ionViewDidLoad() {
    this.now();
  }

  now() {
    return moment.tz("Asia/Jakarta").format("HH:mm");
  }

  redirectTo() {
    this.navCtrl.push(this.redirectComponent);
  }
}
