import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { File } from "@ionic-native/file";

import { AptProvider } from "../../providers/apt/apt";
import { AptDetailPage } from "../apt-detail/apt-detail";

import { AptHelper } from "../../helpers/apt-helper";
import { LoaderHelper } from "../../helpers/loader-helper";
import { AptDummy } from "../../dummy/apt.dummy";

@Component({
  selector: "page-apt",
  templateUrl: "apt.html"
})
export class AptPage {
  params: any = {};
  items: any = [];
  fileDirectory: any;
  loader: any;
  redirectComponent: string = "AptNotifikasiPage";

  isPress: boolean = false;

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
    //this.items = AptDummy.getApt();
  }

  ionViewDidLoad() {
    this.getAptList();
  }

  detailApt(itemId: any) {
    this.navCtrl.push(AptDetailPage, { itemId: itemId });
  }

  isItemPressed() {
    this.isPress = !this.isPress;
  }

  async getAptList() {
    await this.loaderHelper.createLoader();

    this.aptProvider.getPermohonanList().subscribe(
      res => {
        // @TODO : uncomment if data already
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
