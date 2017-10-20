import { Component } from "@angular/core";
import { ModalController, NavController } from "ionic-angular";
import { FilterChartPage } from "../filter-chart/filter-chart";
import { GrafikSuratProvider } from "../../providers/grafik-surat/grafik-surat";
import { LoaderHelper } from "../../helpers/loader-helper";
import * as moment from "moment";

@Component({
  selector: "page-grafik-persuratan",
  templateUrl: "grafik-persuratan.html"
})
export class GrafikPersuratanPage {
  public barChartLabels: string[] = moment.months();

  public barChartData: any[] = null;

  constructor(
    private modalCtrl: ModalController,
    private grafikSuratProvider: GrafikSuratProvider,
    private loaderHelper: LoaderHelper,
    private nav: NavController
  ) {
    this.getSumasData();
  }

  ionViewDidLoad() {}

  getSumasData() {
    this.loaderHelper.createLoader();
    return this.grafikSuratProvider.getSumasData().subscribe(
      res => {
        this.barChartData = res;
        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.errorHandleLoader(err, this.nav);
      }
    );
  }
  showModalFilter() {
    const modal = this.modalCtrl.create(FilterChartPage);

    modal.present();

    // update data by filter
    modal.onDidDismiss(data => {
      // dummy data
      this.barChartData = [
        { data: [10, 10, 10, 10, 10, 10, 10], label: "Selesai" },
        { data: [65, 59, 80, 81, 56, 55, 40], label: "Belum Proses" },
        { data: [65, 59, 80, 81, 56, 55, 40], label: "Disposisi" },
        { data: [65, 59, 80, 81, 56, 55, 40], label: "Teruskan" },
        { data: [65, 59, 80, 81, 56, 55, 40], label: "Naskah Belum Terima" },
        { data: [65, 59, 80, 81, 56, 55, 40], label: "Naskah Diterima" }
      ];
    });
  }

  submitFilter() {}
}
