import { Component, ViewChildren } from "@angular/core";

import { ModalController, NavController } from "ionic-angular";
import { GrafikSuratProvider } from "../../providers/grafik-surat/grafik-surat";
import { LoaderHelper } from "../../helpers/loader-helper";
import { Ng2Highcharts } from "ng2-highcharts";

import * as moment from "moment";

@Component({
  selector: "page-grafik-persuratan",
  templateUrl: "grafik-persuratan.html"
})
export class GrafikPersuratanPage {
  @ViewChildren(Ng2Highcharts) allCharts;

  chartData = {
    chart: {
      type: "column"
    },
    title: {
      text: "Info Umum Naskah Masuk"
    },
    xAxis: {
      categories: moment.months()
    },
    series: []
  };

  constructor(
    private modalCtrl: ModalController,
    private grafikSuratProvider: GrafikSuratProvider,
    private loaderHelper: LoaderHelper,
    private nav: NavController
  ) {}

  ionViewDidLoad() {
    this.getSumasData();
  }

  getSumasData() {}

  showModalFilter() {}
}
