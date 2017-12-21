import { Component, ViewChild } from "@angular/core";
import { LoaderHelper } from "../../helpers/loader-helper";

import { AptProvider } from "../../providers/apt/apt";
import { Slides, NavParams, NavController } from "ionic-angular";
import { ToastHelper } from "../../helpers/toast-helper";

@Component({
  selector: "apt-verifikasi",
  templateUrl: "apt-verifikasi.html"
})
export class AptVerifikasiComponent {
  verifikasiStatus: string;
  currentIndex = 0;
  aptDetailAction: any;
  itemId: number;
  action: string;
  @ViewChild("slider") slider: Slides;
  slides = [];
  message: any;
  constructor(
    public navParams: NavParams,
    private aptProvider: AptProvider,
    private loaderHelper: LoaderHelper,
    private toastHelper: ToastHelper,
    private nav: NavController
  ) {
    this.action = this.navParams.get("action");
    this.itemId = this.navParams.get("itemId");
    this.getDetailAptAction();
  }

  async getDetailAptAction() {
    await this.loaderHelper.createLoader();
    this.action = "pratinjau"; //hilangkan kalo udah ada api verifikasi
    this.aptProvider.getDetailAptAction(this.action, this.itemId).subscribe(
      res => {
        this.aptDetailAction = res.response;
        this.slides = res.response.permohonanSyarat;
        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.dismiss();
        this.nav.pop();
      }
    );
  }
  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
  }

  verifikasi() {
    this.loaderHelper.createLoader();
    const status = { status: this.verifikasiStatus };
    this.aptProvider.verifikasi(this.itemId, status).subscribe(
      res => {
        this.loaderHelper.dismiss();
        this.toastHelper.present(res.message);
        this.nav.pop();
      },
      err => {
        this.loaderHelper.dismiss();
      }
    );
  }
}
