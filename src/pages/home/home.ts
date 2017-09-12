import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { LoginPage } from "../login/login";
import { SuratPage } from "../surat/surat";
import { PersonalPageModule } from "../personal/personal.module";
import { PersonalPage } from "../personal/personal";
import { AptPage } from "../apt/apt";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider
  ) {}

  aptPage() {
    this.navCtrl.push(AptPage);
  }
  logout() {
    this.userProvider.purgeAuth();
    this.navCtrl.setRoot(LoginPage);
  }

  persuratanPage() {
    this.navCtrl.push(SuratPage);
  }

  personalPage() {
    this.navCtrl.push(PersonalPage);
  }
}
