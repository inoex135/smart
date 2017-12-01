import { Component, ViewChild } from "@angular/core";
import { SuratTeruskan } from "../../../models/surat-teruskan";

import { NaskahMasukProvider } from "../../../providers/naskah-masuk/naskah-masuk";

import { NavController, NavParams, LoadingController } from "ionic-angular";
import { MasterUnitProvider } from "../../../providers/master-unit/master-unit";
import { AutoCompleteComponent } from "ionic2-auto-complete";

@Component({
  selector: "teruskan",
  templateUrl: "teruskan.html"
})
export class Teruskan {
  naskah: SuratTeruskan = {
    id: 0,
    tujuan: "",
    alasan: "",
    catatan: ""
  };
  @ViewChild("searchbar") searchbar: AutoCompleteComponent;
  constructor(
    public loading: LoadingController,
    public nav: NavController,
    public navParams: NavParams,
    public naskahProvider: NaskahMasukProvider,
    private masterUnit: MasterUnitProvider
  ) {
    this.naskah.id = this.navParams.get("naskahId");
  }

  teruskan() {
    const loading = this.loading.create({
      content: "Please wait..."
    });

    loading.present();

    // save data naskah untuk diteruskan
    this.naskahProvider.teruskan(this.naskah).subscribe(
      res => {
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      }
    );
  }

  addData(data: Array<any>, item: any) {
    // data.push(item);
  }
}
