import { Component, ViewChild } from "@angular/core";
import { Slides, NavParams } from "ionic-angular";
import { LoaderHelper } from "../../helpers/loader-helper";

import { AptProvider } from "../../providers/apt/apt";
import { ToastHelper } from "../../helpers/toast-helper";
@Component({
  selector: "apt-pratinjau",
  templateUrl: "apt-pratinjau.html"
})
export class AptPratinjauComponent {
  @ViewChild("slider") slider: Slides;
  currentIndex = 0;
  aptDetailAction: any;
  action: string;
  itemId: number;
  slides = [];
  constructor(
    public navParams: NavParams,
    private aptProvider: AptProvider,
    private loaderHelper: LoaderHelper,
    private toast: ToastHelper
  ) {
    this.action = this.navParams.get("action")
    this.itemId = this.navParams.get("itemId")
    this.getDetailAptAction()
  }

  async getDetailAptAction() {
    await this.loaderHelper.createLoader()

    this.aptProvider.getDetailAptAction(this.action, this.itemId).subscribe(
      res => {
        this.aptDetailAction = res.response
        this.slides = res.response.permohonanSyarat
        this.loaderHelper.dismiss()
      },
      err => {
        this.loaderHelper.dismiss()
        this.toast.presentError(err)
      }
    );
  }

  nextSlide() {
    this.slider.slideNext()
  }

  previousSlide() {
    this.slider.slidePrev()
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex()
    console.log("Slide changed! Current index is", this.currentIndex)
  }
}
