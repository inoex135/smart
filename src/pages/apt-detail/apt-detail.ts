import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";

/**
 * Generated class for the AptDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-apt-detail",
  templateUrl: "apt-detail.html"
})
export class AptDetailPage {
  detail: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private aptProvider: AptProvider
  ) {}

  ionViewDidLoad() {
    this.detail = this.getDetailApt();
  }

  getDetailApt() {
    const data = this.aptProvider.getDetail();

    return data;
  }
}
