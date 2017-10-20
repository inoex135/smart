import { Component, ViewChildren } from "@angular/core";
import { ModalController } from "ionic-angular";
import * as moment from "moment";
import { FilterChartPage } from "../filter-chart/filter-chart";
import { Ng2Highcharts } from "ng2-highcharts";

@Component({
  selector: "page-grafik-persuratan-keluar",
  templateUrl: "grafik-persuratan-keluar.html"
})
export class GrafikPersuratanKeluarPage {
  @ViewChildren(Ng2Highcharts) allCharts;
  chartData = {
    chart: {
      type: "column"
    },
    title: {
      text: "Info Umum Naskah Keluar"
    },
    xAxis: {
      categories: moment.months()
    },
    series: [
      {
        name: "NC",
        data: [7057, 6858, 6643, 6570, 6115, 107, 31, 635, 203, 2, 2]
      },
      {
        name: "OK",
        data: [54047, 52484, 50591, 49479, 46677, 33, 156, 947, 408, 6, 2]
      },
      {
        name: "KO",
        data: [11388, 11115, 10742, 10757, 10290, 973, 914, 4054, 732, 34, 2]
      },
      {
        name: "VALID",
        data: [8836, 8509, 8255, 7760, 7621, 973, 914, 4054, 732, 34, 2]
      },
      {
        name: "CHECK",
        data: [115, 162, 150, 187, 172, 973, 914, 4054, 732, 34, 2]
      },
      {
        name: "COR",
        data: [12566, 12116, 11446, 10749, 10439, 973, 914, 4054, 732, 34, 2]
      }
    ]
  };
  constructor(private modalCtrl: ModalController) {}

  ionViewDidLoad() {}

  getSukelData() {}

  showModalFilter() {
    const modal = this.modalCtrl.create(FilterChartPage);

    modal.present();

    // update data by filter
    modal.onDidDismiss(data => {
      // dummy data
      const newData = [
        {
          name: "NC",
          data: [7057, 6858, 6643, 6570, 6115, 107, 31, 635, 203, 2, 2]
        },
        {
          name: "OK",
          data: [54047, 52484, 50591, 49479, 46677, 33, 156, 947, 408, 6, 2]
        },
        {
          name: "KO",
          data: [11388, 11115, 10742, 10757, 10290, 973, 914, 4054, 732, 34, 2]
        },
        {
          name: "VALID",
          data: [8836, 8509, 8255, 7760, 7621, 973, 914, 4054, 732, 34, 2]
        },
        {
          name: "CHECK",
          data: [115, 162, 150, 187, 172, 973, 914, 4054, 732, 34, 2]
        },
        {
          name: "COR",
          data: [12566, 12116, 11446, 10749, 10439, 973, 914, 4054, 732, 34, 2]
        }
      ];
      let chart = [];

      chart = this.allCharts.forEach(chartRef => {
        chartRef.options.series = newData;
      });
    });
  }

  submitFilter() {}
}
