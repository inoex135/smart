import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { UserProvider } from "../../providers/user/user";

@Component({
  selector: "page-home",
  template: `
  <ion-list>
    <button ion-item (click)="logout()">
      <ion-icon name="power"></ion-icon>
      Logout
    </button>

    <button ion-item (click)="logout()">
      <ion-icon name="power"></ion-icon>
      Logout
    </button>
  </ion-list>
  `
})
export class HomePopoverPage {
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private userProvider: UserProvider
  ) {}

  logout() {
    this.viewCtrl.dismiss();
    this.userProvider.purgeAuth();
    this.navCtrl.setRoot(LoginPage);
  }
}
