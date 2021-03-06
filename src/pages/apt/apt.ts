import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  IonicPage,
  App,
  Select
} from "ionic-angular";
import { AptProvider } from "../../providers/apt/apt";
import { LoaderHelper } from "../../helpers/loader-helper";
import remove from "lodash/remove";
import { debounceTime, finalize } from "rxjs/operators";
import { ToastHelper } from "../../helpers/toast-helper";
import { LogUtil } from "../../utils/logutil";
import { NotificationProvider } from "../../providers/notification/notification";
import { AptListItem } from "../../providers/apt/models/apt-list-item";
import { AptListItemContract } from "../../providers/apt/models/contracts/apt-list-item-contract";

@IonicPage()
@Component({
  selector: "page-apt",
  templateUrl: "apt.html"
})
export class AptPage {

  static TAG:string = 'AptPage'

  params: any = {}
  items: Array<AptListItem> = []
  pelayanans: any = []
  loader: any
  redirectComponent: string = "AptNotifikasiPage"

  @ViewChild("selectService") select: Select

  isPress: boolean = false
  keyword: string = ""
  jenisPelayanan: any = ""
  searching: boolean = false

  listAptId: any[] = []
  showAgendaButton: boolean = false

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
    public toast: ToastHelper,
    public navParams: NavParams,
    private aptProvider: AptProvider,
    private loaderHelper: LoaderHelper,
    private toastHelper: ToastHelper,
    private app: App
  ) {
  }

  ionViewDidLoad() {
    this.getPelayananList()
    this.mappingGetData()
  }

  ionViewWillLeave() {
    LogUtil.d(AptPage.TAG, "view did disappear")
    this.loaderHelper.notPresents()
  }
  
  mappingGetData() {
    if (this.type === "dekatBatasWaktu") {
      return this.getDekatBatasWaktu()
    }

    if (this.type === "lewatBatasWaktu") {
      return this.getLewatiBatasWaktu()
    }

    return this.getAptList()
  }

  detailApt(item: AptListItemContract) {
    this.app.getRootNav().push("AptDetailPage", { itemId: item.getId() })
  }

  isItemPressed() {
    this.isPress = !this.isPress
  }

  getPelayananList() {
    this.aptProvider.getPelayananList()
    .then(result => {
      LogUtil.d(AptPage.TAG, result)
      if (result.response.content) {
        this.pelayanans = result.response.content
      }
    })
  }

  async getAptList() {
    this.loaderHelper.show()
    .then(present => { 
      this.aptProvider.getPermohonanList().subscribe(
        res => {
          // @TODO : uncomment if data already
          this.items = res
          this.loaderHelper.dismissLoader()
        },
        err => {
          LogUtil.e(AptPage.TAG, err)
          this.loaderHelper.dismissLoader()
          this.toastHelper.presentError(err)
        }
      )
    })
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
    }, 500);
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
    this.loaderHelper.show()
    .then(present => {
      this.aptProvider.getDekatBatasWaktu(this.keyword, this.page).subscribe(
        res => {
          this.loaderHelper.dismissLoader()
          this.items = res
        },
        err => {
          LogUtil.e(AptPage.TAG, err)
          this.loaderHelper.dismissLoader()
        }
      )
    })
  }

  // get data apt yg lewati batas norma waktu
  async getLewatiBatasWaktu() {
    this.loaderHelper.show()
    .then(present => {
      this.aptProvider.getLewatiBatasWaktu(this.keyword, this.page).subscribe(
        res => {
          this.loaderHelper.dismissLoader()
          this.items = res
        },
        err => this.loaderHelper.dismissLoader()
      )
    })
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

}
