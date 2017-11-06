import { Component, Input } from "@angular/core";

@Component({
  selector: "timeline",
  templateUrl: "timeline.html"
})
export class TimelineComponent {
  @Input("items") items = [];

  constructor() {}
}
