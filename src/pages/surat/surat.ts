import { Component, ViewChildren } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { LoaderHelper } from "../../helpers/loader-helper";
import { NaskahMasukPage } from "../naskah-masuk/naskah-masuk";
import { GrafikSuratProvider } from "../../providers/grafik-surat/grafik-surat";
import { SuratProvider } from "../../providers/surat/surat";

import * as moment from "moment-timezone";
import { Ng2Highcharts } from "ng2-highcharts";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "page-surat",
  templateUrl: "surat.html"
})
export class SuratPage {
  filter: any = {
    startTime: "",
    endTime: ""
  };
  PAGE: any = {
    NOTIFIKASI: "notifikasi",
    NASKAH: "naskah"
  };

  totalPersuratan: any = "";

  redirectComponent: string = "NaskahNotifikasiPage";

  @ViewChildren(Ng2Highcharts) allCharts;

  chartData: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loaderHelper: LoaderHelper,
    public grafikSuratProvider: GrafikSuratProvider,
    public suratProvider: SuratProvider
  ) {
    this.redirectComponent = "NaskahNotifikasiPage";
  }

  ionViewDidLoad() {
    this.setIntervalDate();
    // this.getDataChart();
    this.initData();
  }

  // getDataChart() {
  //   this.loaderHelper.createLoader();

  //   const params = this.grafikSuratProvider.paramsStartAndEnd();

  //   return this.grafikSuratProvider.getFilterSumasData(params).subscribe(
  //     res => {
  //       this.chartData = this.grafikSuratProvider.chartData(res);
  //       this.loaderHelper.dismiss();
  //     },
  //     err => this.loaderHelper.errorHandleLoader(err.error_code, this.navCtrl)
  //   );
  // }

  // set first data when load page
  initData() {
    const params = this.grafikSuratProvider.paramsStartAndEnd();

    Observable.zip(
      this.grafikSuratProvider.getFilterSumasData(params),
      this.suratProvider.getTotalPersuratan()
    ).subscribe(
      ([a, b]) => {
        this.chartData = this.grafikSuratProvider.chartData(a);
        this.totalPersuratan = b;
        console.log(b);
        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.errorHandleLoader(err.error_code, this.navCtrl);
      }
    );
  }

  // search sumas grafik by date
  changeDate() {
    const startTime = this.filter.startTime;
    const endTime = this.filter.endTime;

    const filterDate = this.grafikSuratProvider.filterParams(this.filter);

    if (startTime && endTime) {
      this.grafikSuratProvider.getFilterSumasData(filterDate).subscribe(res => {
        // set new data from server
        this.allCharts.forEach(chartRef => {
          chartRef.options.series = res;
        });
      });
    }
  }

  // when page leave, stop interval date
  ionViewWillLeave() {
    clearInterval(this.setIntervalDate());
  }

  setIntervalDate(): number {
    return setInterval(() => this.dateNow(), 60);
  }

  // show date
  dateNow() {
    return moment.tz("Asia/Jakarta").format("HH:mm");
  }

  openPage(component: any) {
    if (component === this.PAGE.NOTIFIKASI) {
      this.navCtrl.push("NaskahNotifikasiPage");
    }

    if (component === this.PAGE.NASKAH) {
      this.navCtrl.push(NaskahMasukPage);
    }
  }

  showBadge(menu: String) {
    const notification = "Notifikasi";
    return menu == notification ? true : false;
  }
}
