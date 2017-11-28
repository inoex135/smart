import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { AptDetailActionPage } from "../apt-detail-action/apt-detail-action";
import { AptAction } from "../../constant/apt-action";
import { AptProvider } from "../../providers/apt/apt";
import { LoaderHelper } from "../../helpers/loader-helper";

@Component({
  selector: "page-apt-detail",
  templateUrl: "apt-detail.html"
})
export class AptDetailPage {
  itemId: any;
  ACTION = AptAction;

  aptDetail: any = {};

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private aptProvider: AptProvider,
    private loaderHelper: LoaderHelper
  ) {}

  ionViewDidLoad() {
    this.itemId = this.navParams.get("itemId");
    this.getDetailApt();
  }

 async getDetailApt() {
    await this.loaderHelper.createLoader();

    this.aptProvider.getDetailApt(this.itemId).subscribe(
      res => {
        this.aptDetail = res;
        this.loaderHelper.dismiss();
      },
      err => {
        console.log(err);
      }
    );
  }
  

  detailAction(action: string,itemId:any) {
    this.navCtrl.push(AptDetailActionPage, { action: action,itemId:itemId });
  }
}
