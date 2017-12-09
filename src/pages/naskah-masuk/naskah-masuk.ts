import { Component } from "@angular/core";
import { NavController, NavParams, IonicPage } from "ionic-angular";
import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";
import { LoaderHelper } from "../../helpers/loader-helper";
import remove from "lodash/remove";
import { debounceTime, finalize } from "rxjs/operators";

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
    keyword: ""
  };
  naskahTerima: any[] = [];

  searching: boolean = false;

  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private naskahProvider: NaskahMasukProvider,
    private loaderHelper: LoaderHelper
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

    if (type === "type") {
      searchProvider = this.naskahProvider.searchNaskahByTipe(params);
    } else {
      searchProvider = this.naskahProvider.searchNaskah(params);
    }

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
      this.naskahProvider.getNaskahMasuk(this.page).subscribe(res => {
        for (var index = 0; index < res.length; index++) {
          this.listNaskah.push(res[index]);
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

  terimaSemuaNaskah() {
    const idList = { idList: this.naskahTerima };

    this.naskahProvider.terimaSemuaNaskah(idList).subscribe(
      res => {
        this.isBulkAction = false;
      },
      err => console.log(err)
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
}
