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

import { File } from "@ionic-native/file";
import { AptHelper } from "../../helpers/apt-helper";
import { ToastHelper } from "../../helpers/toast-helper";
import { UserProvider } from "../../providers/user/user";
import { TokenProvider } from "../../providers/token/token";

@IonicPage()
@Component({
  selector: "page-naskah-masuk-detail",
  templateUrl: "naskah-masuk-detail.html"
})
export class NaskahMasukDetailPage {
  //file dir transfer for download
  fileDirectory: any;

  private detail: any = {};
  private naskahId: string = "";
  sizeDetail: number = 0;
  actionList: Array<any> = [];
  showModalTerima: boolean = false;

  showDownloadModal: boolean = false;

  @ViewChild(NaskahModalDownloadComponent)
  naskahDownload: NaskahModalDownloadComponent;

  profile: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahMasukProvider,
    private loaderHelper: LoaderHelper,
    file: File,
    private aptHelper: AptHelper,
    private toast: ToastHelper,
    userProvider: UserProvider,
    private token: TokenProvider,
    private modalController: ModalController
  ) {
    this.naskahId = this.navParams.get("naskahId");
    this.fileDirectory = file.externalRootDirectory + "Download";
    this.token.getProfile().then(res => (this.profile = res), err => true);
  }

  openPage(actionData: string) {
    this.navCtrl.push("NaskahDetailActionPage", {
      actionData: actionData,
      naskahId: this.naskahId,
      detailNaskah: this.detail
    });
  }

  ionViewDidLoad() {
    this.actionList = NaskahAction.getAction();

    this.getDetailNaskah();
  }

  async getDetailNaskah() {
    await this.loaderHelper.createLoader();

    this.naskahProvider.getDetailNaskah(this.naskahId).subscribe(
      res => {
        this.detail = res;
        this.showModal();
        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.errorHandleLoader(err.error_message, this.navCtrl);
      }
    );
  }

  showModalTerimaNaskah() {
    let naskahTerima = this.modalController.create("NaskahTerimaPage", {
      userId: 8675309
    });
    naskahTerima.present();
  }

  terimaNaskah() {
    const idList = { idList: [this.naskahId] };
    this.naskahProvider.terimaSemuaNaskah(idList).subscribe(
      res => {
        this.dismiss();
        this.toast.present(res.message);
        this.getDetailNaskah();
      },
      err => this.navCtrl.pop()
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
    try {
      const targetPath = this.fileDirectory + "/" + fileData.namaFile;

      await this.loaderHelper.createLoader();

      const checkPermission = await this.aptHelper.checkPermission();

      // check if apps has permission to write storage
      if (!checkPermission.hasPermission) {
        await this.aptHelper.requestPermission();
      }

      await this.naskahProvider.downloadFileSurat(fileData.id, targetPath);

      // open file after download
      await this.aptHelper.openFile(targetPath, "application/pdf");
      // alert(openFile.message);

      this.loaderHelper.dismiss();
      this.toast.present("File telah di download");
    } catch (error) {}
  }

  showDownloadList() {
    this.naskahDownload.present();
  }
}
