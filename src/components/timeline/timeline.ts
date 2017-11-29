import { Component, Input, EventEmitter, Output } from "@angular/core";
import { TimelineType } from "../../constant/TimelineType";
@Component({
  selector: "timeline",
  templateUrl: "timeline.html"
})
export class TimelineComponent {
  @Input("items") items = [];
  @Input("type") type = "";
  @Output() childEvent = new EventEmitter();

  private CURRENT_TYPE: any;

  constructor() {
    this.CURRENT_TYPE = TimelineType;
  }

  detailAgenda() {
    this.childEvent.emit("this is a test");
  }
}

@Component({
  selector: "timeline-kegiatan",
  template: `<p ion-text>{{kegiatan?.uraian}}</p>`
})
export class TimelineAgendaComponent {
  @Input("kegiatan") kegiatan = {};
  constructor() {}
}

// @Component({
//   selector: "timeline-riwayat",
//   template: "<p ion-text>{{riwayat?.title}}</p>"
// })
// export class TimelineRiwayatNaskahComponent {
//   @Input("riwayat") riwayat = {};
//   constructor() {}
// }
