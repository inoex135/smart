import { Component } from "@angular/core";
import { NavParams, NavController, IonicPage } from "ionic-angular";
import { AptDetailActionPage } from "../apt-detail-action/apt-detail-action";
import { AptAction } from "../../constant/apt-action";
import { AptProvider } from "../../providers/apt/apt";
import { LoaderHelper } from "../../helpers/loader-helper";
import { APT_INDIKATOR } from "../../constant/apt-indikator";
import { ToastHelper } from "../../helpers/toast-helper";
import { AptHistoryPage } from "../apt-history/apt-history";
import { LogUtil } from "../../utils/logutil";
import { FileHelper } from "../../helpers/file-helper";
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: "page-apt-detail",
  templateUrl: "apt-detail.html"
})
export class AptDetailPage {

  static TAG:string = 'AptDetailPage'

  itemId: any;
  ACTION = AptAction;
  aptIndikator = APT_INDIKATOR;
  aptDetail: any = {};
  profile: any;
  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public toast: ToastHelper,
    private navParams: NavParams,
    private aptProvider: AptProvider,
    private loaderHelper: LoaderHelper,
    private fileHelper: FileHelper
  ) {
  }

  ionViewWillEnter() {
    this.itemId = this.navParams.get("itemId")
    this.getDetailApt()
    this.getProfile()
  }

  ionViewWillLeave() {
    LogUtil.d(AptDetailPage.TAG, "view did disappear")
    this.loaderHelper.notPresents()
  }

  getProfile() {
    this.userProvider.getProfile()
    .then(res => {
      this.profile = res;
    });
  }

  private getDetailApt() {
    this.loaderHelper.show()
    .then(() => {
    this.aptProvider.getDetailApt(this.itemId)
    .subscribe(
      res => {
        this.aptDetail = res
        this.readNotifikasi()
        this.loaderHelper.dismissLoader()
      },
      err => {
        this.loaderHelper.dismissLoader()
        this.toast.presentError(err)
      }
    )
    })
  }

  detailAction(action: string, itemId: any) {
    this.navCtrl.push(AptDetailActionPage, { action: action, itemId: itemId });
  }

  //read notifikasi
  async readNotifikasi() {
    this.aptProvider
      .readNotifikasi(this.itemId)
      .subscribe(res => true, err => true);
  }

  async downloadPermohonan(fileApt) {
    try {
      const filename = fileApt.nomor_tiket + FileHelper.PDF_MIME.extension
      const targetPath = `${this.fileHelper.getDownloadDirectory()}/${filename}`;

      await this.loaderHelper.show()

      const checkPermission = await this.fileHelper.checkPermission();

      // check if apps has permission to write storage
      if (!checkPermission.hasPermission) {
        await this.fileHelper.requestPermission();
      }

      await this.aptProvider.download(fileApt.id, targetPath)

      this.loaderHelper.dismissLoader()
      this.fileHelper.openFileWindow(filename)

    } catch (error) {
      this.loaderHelper.dismissLoader()
      this.toast.present(error)
    }
  }

  openHistory() {
    let data = {}
    data[AptHistoryPage.KEY_DATA] = this.aptDetail
    this.navCtrl.push(AptHistoryPage.TAG, data)
  }

}
