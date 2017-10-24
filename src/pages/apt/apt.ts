import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";
import { AptDetailPage } from "../apt-detail/apt-detail";
import { File } from "@ionic-native/file";

import { AptHelper } from "../../helpers/apt-helper";
import { LoaderHelper } from "../../helpers/loader-helper";

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
    private aptHelper: AptHelper,
    private loaderHelper: LoaderHelper
  ) {
    this.fileDirectory = file.externalRootDirectory + "Download";

    this.loader = this.loadingCtrl.create({
      content: "Wait download....",
      spinner: "dots"
    });
  }

  ionViewDidLoad() {
    this.getAptList();
  }

  detailApt(item: any) {
    this.navCtrl.push(AptDetailPage, { detail: item });
  }

  async getAptList() {
    await this.loaderHelper.createLoader();

    this.aptProvider.getPermohonanList().subscribe(
      res => {
        this.items = res;

        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.errorHandleLoader(err.error_code, this.navCtrl);
      }
    );
  }

  async download() {
    const targetPath = this.fileDirectory + "smart.xlsx";

    await this.loaderHelper.createLoader();

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
