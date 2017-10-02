import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "login-layout-1",
  templateUrl: "login.html"
})
export class LoginLayout1 {
  @Input() data: any;
  @Input() events: any;
  @Output() login = new EventEmitter<Object>();

  public username: string;
  public password: string;
  public backgroundImage = "assets/background/29.jpg";

  constructor() {
    this.username = "198604122007101001";
    this.password = "sm4rt@DJKN";
  }
  callParent() {
    this.login.emit({ username: this.username, password: this.password });
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
