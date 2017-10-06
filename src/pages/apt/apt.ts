import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";
import { AptDetailPage } from "../apt-detail/apt-detail";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";

import { AptHelper } from "../../helpers/apt-helper";

@Component({
  selector: "page-apt",
  templateUrl: "apt.html"
})
export class AptPage {
  params: any = {};
  items: any = [];
  fileTransfer: FileTransferObject;
  fileDirectory: any;
  loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private aptProvider: AptProvider,
    private loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private file: File,
    private aptHelper: AptHelper
  ) {
    this.fileTransfer = transfer.create();
    this.items = this.aptProvider.getPermohonanList();
    this.fileDirectory = this.file.externalRootDirectory + "Download";

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
    this.loader.present();

    const checkPermission = await this.aptHelper.checkPermission();
    alert(checkPermission.hasPermission);

    const downloadFile = await this.aptProvider.download();
    alert(downloadFile.exception);

    const fileOpen = await this.aptHelper.openFile(this.fileDirectory);
    console.log(fileOpen);

    this.loader.dismiss();
  }
}
