import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";
import { AptDetailPage } from "../apt-detail/apt-detail";
import { File } from "@ionic-native/file";

import { AptHelper } from "../../helpers/apt-helper";

@Component({
  selector: "page-apt",
  templateUrl: "apt.html"
})
export class AptPage {
  params: any = {};
  items: any = [];
  fileDirectory: any;
  loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private aptProvider: AptProvider,
    private loadingCtrl: LoadingController,
    file: File,
    private aptHelper: AptHelper
  ) {
    this.items = this.aptProvider.getPermohonanList();
    this.fileDirectory = file.externalRootDirectory + "Download";

    this.loader = this.loadingCtrl.create({
      content: "Wait download....",
      spinner: "dots"
    });
  }

  ionViewDidLoad() {}

  detailApt() {
    this.navCtrl.push(AptDetailPage);
  }

  async download() {
    const targetPath = this.fileDirectory + "smart.xlsx";

    this.loader.present();

    const checkPermission = await this.aptHelper.checkPermission();

    // check if apps has permission to write storage
    if (!checkPermission.hasPermission) {
      await this.aptHelper.requestPermission();
    }

    const download = await this.aptProvider.download(targetPath);
    console.log(download);

    const openFile = await this.aptHelper.openFile(targetPath);
    alert(openFile.message);

    this.loader.dismiss();
  }
}
