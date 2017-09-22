import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { NaskahDetailProvider } from "../../providers/naskah-detail/naskah-detail";
@Component({
  selector: "page-naskah-masuk-detail",
  templateUrl: "naskah-masuk-detail.html"
})
export class NaskahMasukDetailPage {
  private detail: any = {};
  private type: String = "detail"; //switch case for riwayat and detail segment
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahDetailProvider,
    private modalCtrl: ModalController
  ) {}

  modalAction(button: String) {
    const modal = this.modalCtrl.create(null);

    modal.present();
  }

  ionViewDidLoad() {
    this.getDetailNaskah();
  }

  getDetailNaskah() {
    this.detail = this.naskahProvider.getDetailNaskah();
  }

  disposisi() {}

  teruskan() {}

  selesai() {}
}
