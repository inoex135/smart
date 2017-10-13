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
  }

  detailNaskah(naskah: any) {
    this.navCtrl.push(NaskahMasukDetailPage, { naskahId: naskah.id });
  }

  getNaskahMasuk() {
    this.naskahProvider
      .getNaskahMasuk()
      .subscribe(res => (this.listNaskah = res));
  }
}
