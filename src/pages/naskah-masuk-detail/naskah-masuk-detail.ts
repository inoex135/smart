import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { NaskahDetailProvider } from "../../providers/naskah-detail/naskah-detail";
import { ModalContentPage } from "./modal-content/modal-content";
@Component({
  selector: "page-naskah-masuk-detail",
  templateUrl: "naskah-masuk-detail.html"
})
export class NaskahMasukDetailPage {
  private detail: any = {};
  private type: String = "detail"; //switch case for riwayat and detail segment
  constructor(
    public navCtrl: NavController,
    private naskahProvider: NaskahDetailProvider,
    private modalCtrl: ModalController
  ) {}

  modalAction(actionType: String) {
    const modal = this.modalCtrl.create(ModalContentPage, {
      actionType: actionType
    });

    modal.present();
  }

  ionViewDidLoad() {
    this.getDetailNaskah();
  }

  getDetailNaskah() {
    this.detail = this.naskahProvider.getDetailNaskah();
  }
}
