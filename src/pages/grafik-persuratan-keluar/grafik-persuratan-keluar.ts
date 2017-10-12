import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-grafik-persuratan-keluar",
  templateUrl: "grafik-persuratan-keluar.html"
})
export class GrafikPersuratanKeluarPage {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {
      data: [10, 20, 30, 50, 50, 60, 70, 80, 90, 100, 110, 120],
      label: "Antrian"
    },
    {
      data: [10, 20, 30, 50, 50, 60, 70, 80, 90, 100, 110, 120],
      label: "Terkirim"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  // events
  public chartClicked(e: any): void {
    // console.log(e);
    // console.log(this.barChartData);
  }

  public chartHovered(e: any): void {
    console.log("ntak");
  }
}
