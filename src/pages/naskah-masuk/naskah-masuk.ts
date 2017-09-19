import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";
import { NaskahMasukDetailPage } from "../naskah-masuk-detail/naskah-masuk-detail";

@Component({
  selector: "page-naskah-masuk",
  templateUrl: "naskah-masuk.html"
})
export class NaskahMasukPage {
  private listNaskah: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahMasukProvider
  ) {}

  ionViewDidLoad() {
    this.getNaskahMasuk();
    console.log(this.listNaskah);
  }

  detailNaskah() {
    this.navCtrl.push(NaskahMasukDetailPage);
  }

  getNaskahMasuk() {
    this.listNaskah = this.naskahProvider.getNaskahMasuk();
    return this.listNaskah;
  }
}
