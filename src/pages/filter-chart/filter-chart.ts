import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  selector: "page-filter-chart",
  templateUrl: "filter-chart.html"
})
export class FilterChartPage {
  filter: any = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString()
  };

  constructor(private viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitFilter() {
    this.viewCtrl.dismiss(this.filter);
  }
}
