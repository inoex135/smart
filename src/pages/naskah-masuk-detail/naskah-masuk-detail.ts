import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";
import { LoaderHelper } from "../../helpers/loader-helper";
import { NaskahDetailActionPage } from "../naskah-detail-action/naskah-detail-action";
import { NaskahAction } from "../../constant/naskah-action";

import "rxjs/add/operator/finally";

@Component({
  selector: "page-naskah-masuk-detail",
  templateUrl: "naskah-masuk-detail.html"
})
export class NaskahMasukDetailPage {
  private detail: any = {};
  private naskahId: string = "";
  sizeDetail: number = 0;
  actionList: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahMasukProvider,
    private loaderHelper: LoaderHelper
  ) {
    this.naskahId = this.navParams.get("naskahId");
  }

  openPage(actionData: String) {
    this.navCtrl.push(NaskahDetailActionPage, { actionData: actionData });
  }

  ionViewDidLoad() {
    this.actionList = NaskahAction.getAction();
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
