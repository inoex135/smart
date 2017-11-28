import { Component, ViewChild } from "@angular/core";
import { Slides, NavController,NavParams } from "ionic-angular";
import { LoaderHelper } from "../../helpers/loader-helper";

import { AptProvider } from "../../providers/apt/apt";
@Component({
  selector: "apt-pratinjau",
  templateUrl: "apt-pratinjau.html"
})
export class AptPratinjauComponent {
  @ViewChild("slider") slider: Slides;
  currentIndex = 0;
  aptDetailAction  : [];
  action: string;
  itemId: string;
  slides = [];
  constructor(
    public navParams: NavParams,
    private aptProvider: AptProvider,
     private loaderHelper: LoaderHelper
  ) {

    this.action = this.navParams.get("action");
    this.itemId = this.navParams.get("itemId");
    this.getDetailAptAction();
  }

 
  async getDetailAptAction() {
    await this.loaderHelper.createLoader();

    this.aptProvider.getDetailAptAction(this.action, this.itemId).subscribe(
      res => {
        this.aptDetailAction = res.response;
        this.slides = res.response.permohonanSyarat;
        this.loaderHelper.dismiss();
      },
      err => {
        console.log(err);
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
    console.log("Slide changed! Current index is", this.currentIndex);
  }
}
