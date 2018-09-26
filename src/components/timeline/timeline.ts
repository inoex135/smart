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

  detailAgenda(date: any) {
    this.childEvent.emit(date);
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