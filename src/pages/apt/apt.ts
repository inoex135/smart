import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { File } from "@ionic-native/file";

import { AptProvider } from "../../providers/apt/apt";
import { AptDetailPage } from "../apt-detail/apt-detail";

import { AptHelper } from "../../helpers/apt-helper";
import { LoaderHelper } from "../../helpers/loader-helper";
import remove from "lodash/remove";
import { debounceTime } from "rxjs/operators";
import { ToastHelper } from "../../helpers/toast-helper";
import { APT_INDIKATOR } from "../../constant/apt-indikator";

@Component({
  selector: "page-apt",
  templateUrl: "apt.html"
})
export class AptPage {
  params: any = {};
  items: any = [];
  pelayanans: any = [];
  fileDirectory: any;
  loader: any;
  redirectComponent: string = "AptNotifikasiPage";

  isPress: boolean = false;
  keyword: string;
  searching: boolean = false;

  listAptId: any[] = [];
  showAgendaButton: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private aptProvider: AptProvider,
    private loadingCtrl: LoadingController,
    file: File,
    private aptHelper: AptHelper,
    private loaderHelper: LoaderHelper,
    private toastHelper: ToastHelper
  ) {
    this.fileDirectory = file.externalRootDirectory + "Download";

    this.loader = this.loadingCtrl.create({
      content: "Wait download....",
      spinner: "dots"
    });
  }

  ionViewDidLoad() {
    this.getPelayananList();
    this.getAptList();
  }

  detailApt(item: any) {
    if (item.statusString === APT_INDIKATOR.DIAGENDAKAN) {
      this.navCtrl.push(AptDetailPage, { itemId: item.id });
    } else {
      this.showAgendaButton = true;
      this.listAptId.push(item.id);
    }
  }

  isItemPressed() {
    this.isPress = !this.isPress;
  }

  getPelayananList() {
    this.aptProvider.getPelayananList().subscribe(
      res => {
        // @TODO : uncomment if data already
        this.pelayanans = res.content;
      },
      err => {
        this.loaderHelper.errorHandleLoader(err.error_code, this.navCtrl);
      }
    );
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

  // async download() {
  //   const targetPath = this.fileDirectory + "smart.xlsx";

  //   await this.loaderHelper.createLoader();

  //   const checkPermission = await this.aptHelper.checkPermission();

  //   // check if apps has permission to write storage
  //   if (!checkPermission.hasPermission) {
  //     await this.aptHelper.requestPermission();
  //   }

  //   const download = await this.aptProvider.download(targetPath);

  //   const openFile = await this.aptHelper.openFile(targetPath);
  //   alert(openFile.message);

  //   this.loader.dismiss();
  // }

  search(keyword: any) {
    let searchProvider: any;
    this.showLoader();
    searchProvider = this.aptProvider.search(keyword);
    searchProvider
      .pipe(debounceTime(700))
      .finally(() => this.hideLoader())
      .subscribe(res => (this.items = res.content));
  }

  searchByTipe(keyword: any) {
    let searchProvider: any;
    searchProvider = this.aptProvider.searchByTipe(keyword);
    searchProvider.subscribe(res => (this.items = res.content), err => false);
  }

  selectedApt(naskahId: any, event) {
    if (event.checked) {
      this.listAptId.push(naskahId);
    } else {
      this.removeNaskah(naskahId);
    }
  }

  removeNaskah(naskahId: number) {
    const removeNaskah = remove(this.listAptId, res => {
      return res == naskahId;
    });

    return removeNaskah;
  }

  agendakanApt() {
    this.aptProvider.agendakanApt({ idList: this.listAptId }).subscribe(
      res => {
        this.isPress = false;
        this.showAgendaButton = false;
        this.toastHelper.present(res.message);
        // ketika sukses agendakan, get data apt yg terbaru
        this.getAptList();
      },
      err => {
        this.isPress = false;
      }
    );
  }

  tidakAgendakanApt() {
    this.aptProvider.tidakAgendakanApt({ idList: this.listAptId }).subscribe(
      res => {
        this.isPress = false;
        this.showAgendaButton = false;
        this.toastHelper.present(res.message);
        // ketika sukses agendakan, get data apt yg terbaru
        this.getAptList();
      },
      err => {
        this.listAptId = [];
        this.isPress = false;
        this.showAgendaButton = false;
        console.log(err);

        // this.toastHelper.present(err.data.message);
      }
    );
  }

  showAgendakanModal() {
    this.showAgendaButton = !this.showAgendaButton;
  }

  showLoader() {
    this.searching = true;
  }

  hideLoader() {
    this.searching = false;
  }
}
