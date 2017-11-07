import { Component, Input } from "@angular/core";

@Component({
  selector: "login-sso",
  templateUrl: "login-sso.html"
})
export class LoginSso {
  @Input() data: any;
  @Input() events: any;

  public username: string;
  public password: string;

  constructor() {
    this.username = "198208212003121002";
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
