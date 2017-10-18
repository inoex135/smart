import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
@Component({
  selector: "page-grafik-persuratan",
  templateUrl: "grafik-persuratan.html"
})
export class GrafikPersuratanPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  public barChartLabels: string[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012"
  ];

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Selesai" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Belum Proses" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Disposisi" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Teruskan" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Naskah Belum Terima" },
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Naskah Diterima" }
  ];
}
