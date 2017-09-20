import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { NaskahDetailProvider } from "../../providers/naskah-detail/naskah-detail";
@Component({
  selector: "page-naskah-masuk-detail",
  templateUrl: "naskah-masuk-detail.html"
})
export class NaskahMasukDetailPage {
  private detail: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahDetailProvider
  ) {}

  ionViewDidLoad() {
    this.getDetailNaskah();
  }

  getDetailNaskah() {
    this.detail = this.naskahProvider.getDetailNaskah();
  }
}
