import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";
import { NaskahMasukDetailPage } from "../naskah-masuk-detail/naskah-masuk-detail";
import { LoaderHelper } from "../../helpers/loader-helper";
import remove from "lodash/remove";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "page-naskah-masuk",
  templateUrl: "naskah-masuk.html"
})
export class NaskahMasukPage {
  private listNaskah: any;
  isBulkAction: boolean = false;

  filter: any = {
    naskahUnit: "",
    keyword: ""
  };
  naskahTerima: any[] = [];

  searching: boolean = false;

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
    this.navCtrl.push(NaskahMasukDetailPage, { naskahId: naskah.id });
  }

  // search naskah by tipe
  searchNaskahByType(param: string) {
    this.searching = true;
    this.naskahProvider
      .searchNaskahByTipe(param)
      .pipe(debounceTime(700))
      .finally(() => {
        this.searching = false;
      })
      .subscribe(res => {
        this.listNaskah = res.data;
      });
  }
  // search sumas by tanggal, no_naskah and terima/tdk terima (0, 1)
  searchSumas(event: any) {
    this.naskahProvider
      .searchNaskah(event)
      .subscribe(res => console.log(), err => console.log(err));
  }

  async getNaskahMasuk() {
    // create loader
    this.loaderHelper.createLoader();

    // show naskah from API
    this.naskahProvider.getNaskahMasuk().subscribe(
      res => {
        this.listNaskah = res.data;

        this.loaderHelper.dismiss();
      },
      err => this.loaderHelper.errorHandleLoader(err, this.navCtrl)
    );
  }

  // event press and hold for bulk terima naskah
  pressAndHoldSurat() {
    this.isBulkAction = !this.isBulkAction;
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
