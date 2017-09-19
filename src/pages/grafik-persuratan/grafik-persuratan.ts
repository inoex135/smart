import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
@Component({
  selector: "page-grafik-persuratan",
  templateUrl: "grafik-persuratan.html"
})
export class GrafikPersuratanPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}
  // Doughnut
  public doughnutChartLabels: string[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail-Order Sales"
  ];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = "doughnut";

  // barchart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012"
  ];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Selesai" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Belum Proses" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Disposisi" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Teruskan" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Naskah Belum Terima" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Naskah Diterima" }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
    console.log(this.barChartData);
  }

  public chartHovered(e: any): void {
    console.log("ntak");
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
