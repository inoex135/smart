import { Component } from "@angular/core";
import { ModalController } from "ionic-angular";
import * as moment from "moment";
import { FilterChartPage } from "../filter-chart/filter-chart";

@Component({
  selector: "page-grafik-persuratan-keluar",
  templateUrl: "grafik-persuratan-keluar.html"
})
export class GrafikPersuratanKeluarPage {
  public barChartLabels: string[] = moment.months();

  public barChartData: any[] = [
    { data: [1, 2, 3, 4, 5, 6, 7], label: "Antrian" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Terkirim" }
  ];

  constructor(private modalCtrl: ModalController) {}

  ionViewDidLoad() {}

  getChartData() {}

  showFilterModal() {
    const modal = this.modalCtrl.create(FilterChartPage);

    modal.present();

    // update data with filter
    modal.onDidDismiss(data => {
      // dummy data
      this.barChartData = [
        { data: [100, 100, 100, 100, 100, 100, 100], label: "Antrian" },
        { data: [65, 59, 80, 81, 56, 55, 40], label: "Terkirim" }
      ];
    });
  }

  submitFilter() {}
}
