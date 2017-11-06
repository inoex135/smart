import { Component, Input } from "@angular/core";

@Component({
  selector: "timeline",
  templateUrl: "timeline.html"
})
export class TimelineComponent {
  @Input("items") items = [];

  constructor() {}
}

@Component({
  selector: "timeline-item",
  template: "<ng-content></ng-content>"
})
export class TimelineItemComponent {
  @Input("items") items = [];
  constructor() {}
}

@Component({
  selector: "timeline-time",
  template: `
    <span>31-December-2018 - Disposisi</span>
    <span>AM-4641/KN/2016</span>
    <span>{{time?.title}}</span>
    <span>{{time?.title}}</span>
    `
})
export class TimelineTimeComponent {
  @Input("time") time = {};
}
