import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  IonicPage,
  App,
  Select
} from "ionic-angular";
import { File } from "@ionic-native/file";
import { AptProvider } from "../../providers/apt/apt";
import { LoaderHelper } from "../../helpers/loader-helper";
import remove from "lodash/remove";
import { debounceTime, finalize } from "rxjs/operators";
import { ToastHelper } from "../../helpers/toast-helper";
import { LogUtil } from "../../utils/logutil";
import { NotificationProvider } from "../../providers/notification/notification";

@IonicPage()
@Component({
  selector: "page-apt",
  templateUrl: "apt.html"
})
export class AptPage {

  static TAG:string = 'AptPage'

  params: any = {};
  items: any = [];
  pelayanans: any = [];
  fileDirectory: any;
  loader: any;
  redirectComponent: string = "AptNotifikasiPage";

  @ViewChild("selectService") select: Select

  isPress: boolean = false;
  keyword: string = "";
  jenisPelayanan: any = "";
  searching: boolean = false;

  listAptId: any[] = [];
  showAgendaButton: boolean = false;

  isSearchOpened:boolean = false

  tabs:any = [
    {
      name: 'Permohonan Masuk',
      isActive: true,
      icon: 'icon-md ion-md-filing',
      provider: ''
    },
    {
      name: 'Dekat Batas Waktu',
      isActive: false,
      icon: 'icon-md ion-md-alert',
      provider: 'dekatBatasWaktu'
    },
    {
      name: 'Lewat Batas Waktu',
      isActive: false,
      icon: 'icon-md ion-md-speedometer',
      provider: 'lewatBatasWaktu'
    }
  ]

  page: number = 0

  type:string = ''

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private aptProvider: AptProvider,
    private loadingCtrl: LoadingController,
    file: File,
    private loaderHelper: LoaderHelper,
    private toastHelper: ToastHelper,
    private app: App
  ) {
    this.fileDirectory = file.externalRootDirectory + "Download";

    this.loader = this.loadingCtrl.create({
      content: "Wait download....",
      spinner: "dots"
    });
  }

  ionViewDidLoad() {
    this.getPelayananList();
    this.mappingGetData();
  }

  mappingGetData() {
    if (this.type === "dekatBatasWaktu") {
      return this.getDekatBatasWaktu();
    }

    if (this.type === "lewatBatasWaktu") {
      return this.getLewatiBatasWaktu();
    }

    return this.getAptList();
  }

  detailApt(item: any) {
    this.app.getRootNav().push("AptDetailPage", { itemId: item.id });
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
      const resourceData = this.mappingInfinityScrollData();

      resourceData.subscribe(
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

  mappingInfinityScrollData() {
    if (this.type === "dekatBatasWaktu") {
      return this.aptProvider.getDekatBatasWaktu(this.keyword, this.page);
    }

    if (this.type === "lewatBatasWaktu") {
      return this.aptProvider.getLewatiBatasWaktu(this.keyword, this.page);
    }

    return this.aptProvider.search(
      this.keyword,
      this.jenisPelayanan,
      this.page
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

  search(keyword: any, layananId: number) {
    LogUtil.d(AptPage.TAG, "keyword: " + keyword + " - service: " + layananId)
    let searchProvider: any;
    this.page = this.page + 1;
    this.showLoader();
    searchProvider = this.aptProvider.search(keyword, layananId);
    searchProvider
      .pipe(debounceTime(700), finalize(() => this.hideLoader()))
      .subscribe(res => {
        LogUtil.d(AptPage.TAG, res)
        this.items = res
      }, err => true);
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

  // get data apt yg lewati batas norma waktu
  async getDekatBatasWaktu() {
    await this.loaderHelper.createLoader();
    this.aptProvider.getDekatBatasWaktu(this.keyword, this.page).subscribe(
      res => {
        this.loaderHelper.dismiss();
        this.items = res;
      },
      err => {
        this.loaderHelper.dismiss();
      }
    );
  }

  // get data apt yg lewati batas norma waktu
  async getLewatiBatasWaktu() {
    await this.loaderHelper.createLoader();
    this.aptProvider.getLewatiBatasWaktu(this.keyword, this.page).subscribe(
      res => {
        this.loaderHelper.dismiss();
        this.items = res;
      },
      err => this.loaderHelper.dismiss()
    );
  }

  redirectTo() {
    this.app.getRootNav().push(AptPage.TAG);
  }

  backButtonClick() {
    LogUtil.d(AptPage.TAG, "arrow back button clicked!")
    if (this.isSearchOpened) {
      this.isSearchOpened = false
    } else {
      LogUtil.d(AptPage.TAG, 'call navigation pop()')
      this.navCtrl.pop()
    }
  }

  onTabClick(index:number) {
    LogUtil.d(AptPage.TAG, "index: " + index)
    this.tabs.forEach((tab, i) => {
      tab.isActive = index == i && !tab.isActive
    })
    this.type = this.tabs[index].provider
    this.getPelayananList();
    this.mappingGetData();
  }

  triggerOpenSelect() {
    if (this.select) {
      LogUtil.d(AptPage.TAG, "not null")
      this.select.open()
    } else {
      LogUtil.d(AptPage.TAG, "probably null")
    }
  }

  getNotificationType():string {
    return NotificationProvider.TYPE_APT
  }

  getStatusColor(status:string = ''):string {
    switch(status) {
      case 'Permohonan Aktif':
        return 'new-green-background'
      case 'Permohonan aktif mendekati batas waktu':
        return 'new-orange-background'
      case 'Permohonan melebihi batas waktu':
        return 'new-red-background'
      default:
        return 'white-background'
    }
  }

}
