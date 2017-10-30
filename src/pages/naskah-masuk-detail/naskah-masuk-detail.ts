import { Component } from "@angular/core";
import { NavController, ModalController, NavParams } from "ionic-angular";
import { ModalContentPage } from "./modal-content/modal-content";
import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";
import { LoaderHelper } from "../../helpers/loader-helper";

@Component({
  selector: "page-naskah-masuk-detail",
  templateUrl: "naskah-masuk-detail.html"
})
export class NaskahMasukDetailPage {
  private detail: any = {};
  private type: String = "detail"; //switch case for riwayat and detail segment
  private naskahId: string = "";
  sizeDetail: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahMasukProvider,
    private modalCtrl: ModalController,
    private loaderHelper: LoaderHelper
  ) {
    this.naskahId = this.navParams.get("naskahId");
  }

  modalAction(actionType: String) {
    const modal = this.modalCtrl.create(ModalContentPage, {
      actionType: actionType
    });

    modal.present();
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
        console.log(res);

        return (this.detail = res);
      });
  }
}
