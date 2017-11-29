import { Component,ViewChild } from "@angular/core";
import { LoaderHelper } from "../../helpers/loader-helper";

import { AptProvider } from "../../providers/apt/apt";
import { Slides, NavController,NavParams } from "ionic-angular";

@Component({
  selector: "apt-verifikasi",
  templateUrl: "apt-verifikasi.html"
})
export class AptVerifikasiComponent {
  	verifikasiStatus: string;
	aptDetailAction  : any;
	itemId: number;
	action: string;
	@ViewChild("slider") slider: Slides;
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
    this.action = "pratinjau";  //hilangkan kalo udah ada api verifikasi
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
}
