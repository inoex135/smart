import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  IonicPage,
  ModalController
} from "ionic-angular";

import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";
import { LoaderHelper } from "../../helpers/loader-helper";

import { NaskahAction } from "../../constant/naskah-action";

import { NaskahModalDownloadComponent } from "../../components/naskah-modal-download/naskah-modal-download";

import { ToastHelper } from "../../helpers/toast-helper";
import { UserProvider } from "../../providers/user/user";

import assign from "lodash/assign";
import { NaskahNotifikasiProvider } from "../../providers/naskah-notifikasi/naskah-notifikasi";
import { LogUtil } from "../../utils/logutil";
import { NaskahDetailActionPage } from "../naskah-detail-action/naskah-detail-action";
import { FileHelper } from "../../helpers/file-helper";

@IonicPage()
@Component({
  selector: "page-naskah-masuk-detail",
  templateUrl: "naskah-masuk-detail.html"
})
export class NaskahMasukDetailPage {
 
  static TAG:string = 'NaskahMasukDetailPage'

  //file dir transfer for download
  private detail: any = {};
  private naskahId: string = "";
  sizeDetail: number = 0;
  actionList: Array<any> = [];
  showModalTerima: boolean = false;

  showDownloadModal: boolean = false;

  @ViewChild(NaskahModalDownloadComponent)
  naskahDownload: NaskahModalDownloadComponent;

  profile: any;

  // get terima naskah param dari modal
  terimaNaskahParam: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahMasukProvider,
    private loaderHelper: LoaderHelper,
    private toast: ToastHelper,
    private userProvider: UserProvider,
    private modalController: ModalController,
    private naskahNotifikasi: NaskahNotifikasiProvider,
    private fileHelper: FileHelper
  ) {
    this.naskahId = this.navParams.get("naskahId");
    this.userProvider.getToken().getProfile().then(res => (this.profile = res), err => true);
  }

  openPage(actionData: string) {
    this.navCtrl.push(NaskahDetailActionPage.TAG, {
      actionData: actionData,
      naskahId: this.naskahId,
      detailNaskah: this.detail
    });
  }

  openDisposisiPage() {
    this.navCtrl.push('DisposisiPage', {
      naskahId: this.naskahId,
      detailNaskah: this.detail
    })
  }

  ionViewWillEnter() {
    this.actionList = NaskahAction.getAction();

    this.getDetailNaskah();
    // update notification
    // this.updateNotification();
  }

  ionViewWillLeave() {
    LogUtil.d(NaskahMasukDetailPage.TAG, "view did disappear")
    this.loaderHelper.notPresents()
  }

  async getDetailNaskah() {
    this.loaderHelper.show()
    .then(isPresent => {
      this.naskahProvider.getDetailNaskah(this.naskahId)
      .subscribe(
        res => {
          this.detail = res;
          this.showModal();
          this.loaderHelper.dismissLoader()
          this.naskahNotifikasi
            .readNotifikasi(this.naskahId)
            .subscribe(res => true, err => false)
        },
        err => {
          this.loaderHelper.dismissLoader()
        }
      )
    })
  }

  updateNotification() {
    this.naskahProvider.updateNotification();
  }

  showModalTerimaNaskah() {
    let naskahTerima = this.modalController.create("NaskahTerimaPage");
    naskahTerima.present();

    naskahTerima.onDidDismiss(params => {
      if (params) {
        this.terimaNaskahParam = params;
        this.terimaNaskah();
      }
    });
  }

  terimaNaskah() {
    const idList = { idList: [this.naskahId] };

    const params = assign(idList, this.terimaNaskahParam);

    this.naskahProvider.terimaSemuaNaskah(params).subscribe(
      res => {
        this.dismiss();
        this.toast.present(res.message);
        this.getDetailNaskah();
      },
      err => {
        this.dismiss();
        this.toast.present("Terjadi Kesalahan");
        this.navCtrl.pop();
      }
    );
  }
  showModal() {
    if (!this.detail.statusTerimaSurat) {
      return (this.showModalTerima = true);
    }
  }

  dismiss() {
    this.showModalTerima = false;
  }

  async downloadFile(fileData: any) {
    await this.loaderHelper.show();
    try {
      LogUtil.d(NaskahMasukDetailPage.TAG, fileData)
      const targetPath = this.fileHelper.getDownloadDirectory() + "/" + fileData.namaFile;
      LogUtil.d(NaskahMasukDetailPage.TAG, targetPath)

      const checkPermission = await this.fileHelper.checkPermission();
      // check if apps has permission to write storage
      if (!checkPermission.hasPermission) {
        await this.fileHelper.requestPermission();
      }

      await this.naskahProvider.downloadFileSurat(fileData.id, targetPath);
      
      this.loaderHelper.dismissLoader()
      this.fileHelper.openFileWindow(fileData.namaFile)
    } catch (error) {
      this.loaderHelper.dismissLoader()
      LogUtil.e(NaskahMasukDetailPage.TAG, error)
      this.toast.present(error)
    }
  }

  showDownloadList() {
    this.naskahDownload.present();
  }
}
