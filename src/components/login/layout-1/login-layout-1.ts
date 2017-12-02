import { Component, Input } from "@angular/core";

@Component({
  selector: "login-layout-1",
  templateUrl: "login.html"
})
export class LoginLayout1 {
  @Input() data: any;
  @Input() events: any;
  @Input() loginState: any;

  public username: string;
  public password: string;

  constructor() {
    this.username = "196208271982091001";
    this.password = "sm4rt@DJKN";
  }

  onEvent = (event: string): void => {
    if (this.events[event]) {
      this.events[event]({
        username: this.username,
        password: this.password
      });
    }
  };
}
