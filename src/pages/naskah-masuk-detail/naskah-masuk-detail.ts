import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-naskah-masuk-detail",
  templateUrl: "naskah-masuk-detail.html"
})
export class NaskahMasukDetailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad NaskahMasukDetailPage");
  }
}
