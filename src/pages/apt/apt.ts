import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";
import { AptDetailPage } from "../apt-detail/apt-detail";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../../providers/token/token";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
@Component({
  selector: "page-apt",
  templateUrl: "apt.html"
})
export class AptPage {
  params: any = {};
  items: any = [];
  fileTransfer: FileTransferObject;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private aptProvider: AptProvider,
    private loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private file: File,
    private token: TokenProvider
  ) {
    this.fileTransfer = transfer.create();
    this.items = this.aptProvider.getPermohonanList();
  }

  ionViewDidLoad() {}

  detailApt() {
    this.navCtrl.push(AptDetailPage);
  }

  download() {
    const loader = this.loadingCtrl.create({
      content: "Wait download....",
      spinner: "dots"
    });

    loader.present();
    const url = `${ENV.API_URL}/surat/sumas/excel/template`;

    this.aptProvider
      .download()
      .then(res => {
        console.log(res);
        alert("success");
        loader.dismiss();
      })
      .catch(err => {
        alert("error");
        console.log(err, this.token.latestToken);
        loader.dismiss();
      });
  }
}
