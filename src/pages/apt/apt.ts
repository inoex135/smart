import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  IonicPage
} from "ionic-angular";
import { File } from "@ionic-native/file";

import { AptProvider } from "../../providers/apt/apt";

import { AptHelper } from "../../helpers/apt-helper";
import { LoaderHelper } from "../../helpers/loader-helper";
import remove from "lodash/remove";
import { debounceTime, finalize } from "rxjs/operators";
import { ToastHelper } from "../../helpers/toast-helper";
import { APT_INDIKATOR } from "../../constant/apt-indikator";

@IonicPage()
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
  keyword: string = "";
  jenisPelayanan: any = "";
  searching: boolean = false;

  listAptId: any[] = [];
  showAgendaButton: boolean = false;

  page: number = 0;
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
    this.navCtrl.push("AptDetailPage", { itemId: item.id });
  }

  isItemPressed() {
    this.isPress = !this.isPress;
  }

  getPelayananList() {
    this.aptProvider.getPelayananList().subscribe(
      res => {
        this.pelayanans = res.content;
      },
      err => {
        console.log(err);
        this.loaderHelper.errorHandleLoader(err, this.navCtrl);
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
      console.log(err);
        this.loaderHelper.errorHandleLoader(err, this.navCtrl);
      }
    );
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.aptProvider
        .search(this.keyword, this.jenisPelayanan, this.page)
        .subscribe(
          res => {
            for (var index = 0; index < res.length; index++) {
              this.items.push(res[index]);
            }
          },
          err => {
            this.navCtrl.pop();
          }
        );
      infiniteScroll.complete();
    }, 1000);
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

  search(keyword: any, layananId: number) {
    let searchProvider: any;
    this.page = this.page + 1;
    this.showLoader();
    searchProvider = this.aptProvider.search(keyword, layananId);
    searchProvider
      .pipe(debounceTime(700), finalize(() => this.hideLoader()))
      .subscribe(res => (this.items = res), err => true);
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
