import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";
import { LoaderHelper } from "../../helpers/loader-helper";
import { NaskahDetailActionPage } from "../naskah-detail-action/naskah-detail-action";

@Component({
  selector: "page-naskah-masuk-detail",
  templateUrl: "naskah-masuk-detail.html"
})
export class NaskahMasukDetailPage {
  private detail: any = {};
  private naskahId: string = "";
  sizeDetail: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahMasukProvider,
    private loaderHelper: LoaderHelper
  ) {
    this.naskahId = this.navParams.get("naskahId");
  }

  openPage(type: String) {
    this.navCtrl.push(NaskahDetailActionPage, { type: type });
  }

  ionViewDidLoad() {
    this.getDetailNaskah();
  }

  async getDetailNaskah() {
    await this.loaderHelper.createLoader();

    this.naskahProvider
      .getDetailNaskah(this.naskahId)
      .finally(() => this.loaderHelper.dismiss())
      .subscribe(res => {
        return (this.detail = res);
      });
  }
}
