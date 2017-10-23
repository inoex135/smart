import { Component, ViewChildren } from "@angular/core";

import { ModalController, NavController } from "ionic-angular";
import { FilterChartPage } from "../filter-chart/filter-chart";
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

  getSumasData() {
    this.loaderHelper.createLoader();

    const params = this.paramsStartAndEnd();

    return this.grafikSuratProvider.getFilterSumasData(params).subscribe(
      res => {
        this.chartData.series = res;
        this.loaderHelper.dismiss();
      },
      err => {
        this.loaderHelper.errorHandleLoader(err.error_code, this.nav);
      }
    );
  }

  showModalFilter() {
    const modal = this.modalCtrl.create(FilterChartPage);

    modal.present();

    // update data by filter
    modal.onDidDismiss(data => {
      // cek if param is set
      if (data) {
        // convert params to specific format
        const params = this.filterParams(data);

        // get http data
        this.grafikSuratProvider.getFilterSumasData(params).subscribe(res => {
          // set new data from server
          this.allCharts.forEach(chartRef => {
            chartRef.options.series = res;
          });
        });
      }
    });
  }

  paramsStartAndEnd() {
    const date = {
      startTime: moment()
        .startOf("year")
        .format("DD-MM-YYYY"),
      endTime: moment()
        .endOf("year")
        .format("DD-MM-YYYY")
    };

    return date;
  }

  convertParam(param: any) {
    return moment(param).format("DD-MM-YYYY");
  }

  filterParams(params: any) {
    params.startTime = this.convertParam(params.startTime);
    params.endTime = this.convertParam(params.endTime);

    return params;
  }
}
