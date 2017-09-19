import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";
import { AptDetailPage } from "../apt-detail/apt-detail";

@Component({
  selector: "page-apt",
  templateUrl: "apt.html"
})
export class AptPage {
  params: any = {};
  coba: any = "ntak";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private aptProvider: AptProvider
  ) {
    const self: AptPage = this;
    this.params.data = {
      items: this.aptProvider.getPermohonanList()
    };
    this.params.events = {
      onItemClick: function(item: any) {
        self.navCtrl.push(AptDetailPage);
      },
      onDownload: function(item: any) {
        self.aptProvider.getDetail();
      }
    };
  }

  ionViewDidLoad() {}
}
