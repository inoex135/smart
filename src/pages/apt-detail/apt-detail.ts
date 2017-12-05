import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { AptDetailActionPage } from "../apt-detail-action/apt-detail-action";
import { AptAction } from "../../constant/apt-action";
import { AptProvider } from "../../providers/apt/apt";
import { LoaderHelper } from "../../helpers/loader-helper";
import { AptHelper } from "../../helpers/apt-helper";
import { File } from "@ionic-native/file";
import { APT_INDIKATOR } from "../../constant/apt-indikator";
import { ToastHelper } from "../../helpers/toast-helper";

@Component({
  selector: "page-apt-detail",
  templateUrl: "apt-detail.html"
})
export class AptDetailPage {
  itemId: any;
  ACTION = AptAction;
  aptIndikator = APT_INDIKATOR;
  aptDetail: any = {};
  fileDirectory: any;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private aptProvider: AptProvider,
    private loaderHelper: LoaderHelper,
    file: File,
    private aptHelper: AptHelper,
    private toast: ToastHelper
  ) {
    this.fileDirectory = file.externalRootDirectory + "Download";
  }

  ionViewDidLoad() {
    this.itemId = this.navParams.get("itemId");
    this.getDetailApt();
  }

  async getDetailApt() {
    await this.loaderHelper.createLoader();

    this.aptProvider.getDetailApt(this.itemId).subscribe(
      res => {
        const response = res.response;
        this.aptDetail = response.permohonan;

        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.errorHandleLoader(err, this.navCtrl);
      }
    );
  }

  detailAction(action: string, itemId: any) {
    this.navCtrl.push(AptDetailActionPage, { action: action, itemId: itemId });
  }

  async downloadPermohonan(fileApt) {
    console.log(fileApt);

    try {
      const targetPath = `${this.fileDirectory}/${fileApt.nomorTiket}.pdf`;

      await this.loaderHelper.createLoader();

      const checkPermission = await this.aptHelper.checkPermission();

      // check if apps has permission to write storage
      if (!checkPermission.hasPermission) {
        await this.aptHelper.requestPermission();
      }

      this.aptProvider.download(fileApt.id, targetPath);

      // open file after download
      // const openFile = await this.aptHelper.openFile(targetPath);
      // alert(openFile.message);
      this.toast.present("File telah di download");
      this.loaderHelper.dismiss();
    } catch (error) {
      this.loaderHelper.dismiss();
      this.toast.present(error);
    }
  }
}
