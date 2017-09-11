import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { LoginPage } from "../login/login";
import { SuratPage } from "../surat/surat";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider
  ) {}

  logout() {
    this.userProvider.purgeAuth();
    // this.navCtrl.setRoot(LoginPage);
  }

  goToPersuratan() {
    this.navCtrl.push(SuratPage);
  }
}
