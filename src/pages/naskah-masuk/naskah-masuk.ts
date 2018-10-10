import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  IonicPage,
  Modal, ModalController, ModalOptions
} from "ionic-angular";
import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";
import { LoaderHelper } from "../../helpers/loader-helper";
import remove from "lodash/remove";
import { debounceTime, finalize } from "rxjs/operators";
import { ToastHelper } from "../../helpers/toast-helper";
import assign from "lodash/assign";

@IonicPage()
@Component({
  selector: "page-naskah-masuk",
  templateUrl: "naskah-masuk.html"
})
export class NaskahMasukPage {
  listNaskah: any = [];
  isBulkAction: boolean = false;

  filter: any = {
    naskahUnit: "",
    naskahSifat: ""
  };

  naskahTerima: any[] = [];

  searching: boolean = false;
  isSearchOpen: boolean = false;

  page: number = 0;

  //get param terima naskah modal
  terimaNaskahParam: any;
  //jenis :any="";
  //sifat :any="";
  keyword :any="";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahMasukProvider,
    private loaderHelper: LoaderHelper,
    private toast: ToastHelper,
    private modalController: ModalController,
    private modal: ModalController
  ) {}

  ionViewDidLoad() {
    this.getNaskahMasuk();
  }

  detailNaskah(naskah: any) {
    this.navCtrl.push("NaskahMasukDetailPage", { naskahId: naskah.id });
  }

  //proses search by type dan default search
  searchNaskahBy(type: string, params: any) {
    let searchProvider: any;

    this.showLoader();
    /* if (type === "type") {
      this.jenis = params;
      //searchProvider = this.naskahProvider.searchNaskahByTipe(params);
    } else if (type === "sifat") {
      this.sifat = params;
      //searchProvider = this.naskahProvider.searchNaskahBySifat(params);
    } else {
      this.keyword = params;
      //
    } */
    this.keyword = params;
    searchProvider = this.naskahProvider.searchNaskahComplete(this.filter.naskahUnit, this.filter.naskahSifat, this.keyword);
    searchProvider
      .pipe(debounceTime(700), finalize(() => this.hideLoader()))
      .subscribe(
        res => (this.listNaskah = res.response),
        err => this.handleErrorSearch(params)
      );
  }

  // untuk handle ketika klik ion-cancel di klik
  // dan ketika dihapus melaui backspace
  handleErrorSearch(params: any) {
    // undefined return dari ion-cancel, sedangkan "" dari $event.target.value
    if (params === undefined || params === "") {
      this.getNaskahMasuk();
    } else {
      this.listNaskah = [];
    }
  }

  async getNaskahMasuk() {
    // create loader
    await this.loaderHelper.createLoader();

    // show naskah from API
    this.naskahProvider.getNaskahMasuk().subscribe(
      res => {
        this.listNaskah = res.response;

        this.loaderHelper.dismiss();
      },
      err => this.loaderHelper.dismiss()
    );
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.naskahProvider.searchNaskahComplete(this.filter.naskahUnit, this.filter.naskahSifat,this.keyword,this.page)
      .subscribe(res => {
      
        for (var index = 0; index < res.response.length; index++) {
          
          this.listNaskah.push(res.response[index]);
        }
      });
      infiniteScroll.complete();
    }, 1000);
  }

  // event press and hold for bulk terima naskah
  pressAndHoldSurat() {
    this.isBulkAction = !this.isBulkAction;
  }
  showLoader() {
    this.searching = true;
  }

  hideLoader() {
    this.searching = false;
  }

  showModalTerimaNaskah() {
    let naskahTerima = this.modalController.create("NaskahTerimaPage");
    naskahTerima.present();

    naskahTerima.onDidDismiss(param => {
      // naskah diterima jika terdapat param tanggal terima dan personal terima
      if (param) {
        this.terimaNaskahParam = param;
        this.terimaSemuaNaskah();
      }
    });
  }

  //proses terima naskah bulk action
  terimaSemuaNaskah() {
    const idList = { idList: this.naskahTerima };

    const params = assign(idList, this.terimaNaskahParam);

    this.naskahProvider.terimaSemuaNaskah(params).subscribe(
      res => {
        this.toast.present("Naskah telah diterima");
        this.getNaskahMasuk();
        this.isBulkAction = false;
      },
      err => this.toast.present("Gagal terima naskah")
    );
  }

  selectedNaskah(naskahId: any, event) {
    if (event.checked) {
      this.naskahTerima.push(naskahId);
    } else {
      this.removeNaskah(naskahId);
    }
  }

  removeNaskah(naskahId: number) {
    const removeNaskah = remove(this.naskahTerima, res => {
      return res == naskahId;
    });

    return removeNaskah;
  }

  doRefresh(refresher) {
    this.naskahProvider.getNaskahMasuk().subscribe(
      res => {
        this.listNaskah = res.response
        refresher.complete()
      },
      err => { 
        this.loaderHelper.dismiss()
        refresher.complete();
       }
    );
  }

  changeColor(status:string = '') {
    if (status.includes('Disposisi')) {
      return '#ffb600'
    } else if (status.includes('Belum Proses')) {
      return '#d62222'
    } else if (status.includes('Teruskan')) {
      return '#1cb3ff'
    } else if (status.includes('Selesai')) {
      return '#26b459'
    }
    return 'default' 
  }

  backButtonClick() {
    if (this.isSearchOpen) {
      this.isSearchOpen = false
    } else {
      this.navCtrl.pop()
    }
  }

  clickFilter() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModal: Modal = this.modal.create('ModalFilterPage', { filter: this.filter }, myModalOptions);
    myModal.present();
    myModal.onDidDismiss(data => {
      if (data != null) {
        this.filter = data
        this.searchNaskahBy('search', this.keyword);
      }
    });
 
  }

}
