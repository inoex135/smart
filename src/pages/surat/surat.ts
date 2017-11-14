import { Component, ViewChildren } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { Ng2Highcharts } from "ng2-highcharts";
import * as moment from "moment-timezone";
import { LoaderHelper } from "../../helpers/loader-helper";
import { GrafikSuratProvider } from "../../providers/grafik-surat/grafik-surat";
import { NaskahMasukPage } from "../naskah-masuk/naskah-masuk";

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

  redirectComponent: string = "NaskahNotifikasiPage";

  @ViewChildren(Ng2Highcharts) allCharts;

  chartData: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loaderHelper: LoaderHelper,
    public grafikSuratProvider: GrafikSuratProvider
  ) {
    this.redirectComponent = "NaskahNotifikasiPage";
  }

  ionViewDidLoad() {
    this.setIntervalDate();
    this.getDataChart();
  }

  getDataChart() {
    this.loaderHelper.createLoader();

    const params = this.grafikSuratProvider.paramsStartAndEnd();

    return this.grafikSuratProvider.getFilterSumasData(params).subscribe(
      res => {
        this.chartData = this.grafikSuratProvider.chartData(res);
        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.errorHandleLoader(err.error_code, this.navCtrl);
      }
    );
  }

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

  dateNow() {
    return moment.tz("Asia/Jakarta").format("HH:mm");
  }

  openPage(component: any) {
    switch (component) {
      case this.PAGE.NOTIFIKASI:
        this.navCtrl.push("NaskahNotifikasiPage");
        break;
      case this.PAGE.NASKAH:
        this.navCtrl.push(NaskahMasukPage);
        break;
      default:
        break;
    }
  }

  showBadge(menu: String) {
    const notification = "Notifikasi";
    return menu == notification ? true : false;
  }
}
