import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "timeline",
  templateUrl: "timeline.html"
})
export class TimelineComponent {
  @Input("items") items = [];

  @Output() childEvent = new EventEmitter();
  detailAgenda() {
    this.childEvent.emit("this is a test");
  }
}
