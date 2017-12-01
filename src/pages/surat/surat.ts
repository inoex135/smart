import { Component, ViewChildren } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { LoaderHelper } from "../../helpers/loader-helper";
import { NaskahMasukPage } from "../naskah-masuk/naskah-masuk";
import { GrafikSuratProvider } from "../../providers/grafik-surat/grafik-surat";
import { SuratProvider } from "../../providers/surat/surat";

import * as moment from "moment-timezone";
import { Ng2Highcharts } from "ng2-highcharts";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/zip";
import { DatepickerProvider } from "../../providers/datepicker/datepicker";
import { MomentHelper } from "../../helpers/moment-helper";
import { TokenProvider } from "../../providers/token/token";

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

  isSekretaris: boolean = false;

  totalPersuratan: any = "";

  redirectComponent: string = "NaskahNotifikasiPage";

  @ViewChildren(Ng2Highcharts) allCharts;

  chartData: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loaderHelper: LoaderHelper,
    public grafikSuratProvider: GrafikSuratProvider,
    public suratProvider: SuratProvider,
    private datepicker: DatepickerProvider,
    private momentHelper: MomentHelper,
    private tokenProvider: TokenProvider
  ) {
    this.redirectComponent = "NaskahNotifikasiPage";
  }

  ionViewDidLoad() {
    this.setIntervalDate();
    this.initData();
    this.checkSekretaris();
  }

  async checkSekretaris() {
    const profile: any = await this.tokenProvider.getProfile();
    this.isSekretaris = profile.is_sekretaris;
  }

  // set first data when load page for total surat + filter sumas grafik
  initData() {
    const params = this.grafikSuratProvider.paramsStartAndEnd();

    this.loaderHelper.createLoader();

    Observable.zip(
      this.grafikSuratProvider.getFilterSumasData(params),
      this.suratProvider.getTotalPersuratan()
    ).subscribe(
      ([chartData, totalSurat]) => {
        this.chartData = this.grafikSuratProvider.chartData(chartData);
        this.totalPersuratan = totalSurat;

        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.errorHandleLoader(err.error_code, this.navCtrl);
      }
    );
  }

  // search sumas grafik by date
  changeDate() {}

  getDataFilter() {
    const startTime = this.filter.startTime;
    const endTime = this.filter.endTime;

    if (startTime && endTime) {
      this.grafikSuratProvider
        .getFilterSumasData(this.filter)
        .subscribe(res => {
          // set new data from server
          this.allCharts.forEach(chartRef => {
            chartRef.options.series = res;
          });
        });
    }
  }

  async getStartTime() {
    try {
      const startTime = await this.datepicker.datePickerData("date");

      this.filter.startTime = this.momentHelper.convertIsoTo(
        startTime,
        "DD-MM-YYYY"
      );
    } catch (error) {}
  }

  async getEndTime() {
    try {
      const endTime = await this.datepicker.datePickerData("date");
      this.filter.endTime = this.momentHelper.convertIsoTo(
        endTime,
        "DD-MM-YYYY"
      );
    } catch (error) {}
  }

  // when page leave, stop interval date
  ionViewWillLeave() {
    clearInterval(this.setIntervalDate());
  }

  setIntervalDate(): number {
    return window.setInterval(() => this.dateNow(), 60);
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

  // onchange pencarian surat
  searchSurat() {}
}
