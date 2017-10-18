import { Component, Input } from "@angular/core";

@Component({
  selector: "chart-surat",
  templateUrl: "chart-surat.html"
})
export class ChartSuratComponent {
  text: string;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  @Input() ntak: any = "";

  @Input()
  barChartLabels: string[] = [
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

  @Input() barChartData: any[] = [];

  // events
  public chartClicked(e: any): void {
    console.log(this.barChartData);
    // console.log(this.barChartData);
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
