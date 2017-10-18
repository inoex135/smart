import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import * as moment from "moment";

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

  constructor() {}
}
