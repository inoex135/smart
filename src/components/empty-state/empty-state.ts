import { Component, Input } from "@angular/core";

@Component({
  selector: "empty-state",
  templateUrl: "empty-state.html"
})
export class EmptyStateComponent {
  @Input() emptyState = "Data Tidak Ada";

  constructor() {}
}
