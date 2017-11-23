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
  showModalTerima: boolean = false;

  showDownloadModal: boolean = false;

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
        this.detail = res;
        this.showModal();
      });
  }

  terimaNaskah() {
    const idList = { idList: [this.naskahId] };
    this.naskahProvider
      .terimaSemuaNaskah(idList)
      .finally(this.dismiss)
      .subscribe(res => true, err => this.navCtrl.pop());
  }
  showModal() {
    if (!this.detail.statusTerimaSurat) {
      return (this.showModalTerima = true);
    }
  }

  dismiss() {
    this.showModalTerima = false;
  }

  showDownloadList() {
    this.showDownloadModal = true;
  }
}
