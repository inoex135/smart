import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";
import { NaskahMasukDetailPage } from "../naskah-masuk-detail/naskah-masuk-detail";
import { LoaderHelper } from "../../helpers/loader-helper";

@Component({
  selector: "page-naskah-masuk",
  templateUrl: "naskah-masuk.html"
})
export class NaskahMasukPage {
  private listNaskah: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahMasukProvider,
    private loaderHelper: LoaderHelper
  ) {}

  ionViewDidLoad() {
    this.getNaskahMasuk();
  }

  detailNaskah(naskah: any) {
    this.navCtrl.push(NaskahMasukDetailPage, { naskahId: naskah.id });
  }

  async getNaskahMasuk() {
    // create loader
    this.loaderHelper.createLoader();

    // show loader
    await this.loaderHelper.present();

    this.naskahProvider
      .getNaskahMasuk()
      .finally(() => this.loaderHelper.dismiss())
      .subscribe(res => {
        this.listNaskah = res;
      });
  }
}
