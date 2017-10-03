import { Component, Input } from "@angular/core";

@Component({
  selector: "login-layout-1",
  templateUrl: "login.html"
})
export class LoginLayout1 {
  @Input() data: any;
  @Input() events: any;

  public username: string;
  public password: string;
  public backgroundImage = "assets/background/4.png";

  constructor() {
    this.username = "198604122007101001";
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
