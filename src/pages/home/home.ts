import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { LoginPage } from "../login/login";
import { SuratPage } from "../surat/surat";
import { PersonalPage } from "../personal/personal";
import { AptPage } from "../apt/apt";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public menus: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider
  ) {}

  ionViewDidLoad() {
    this.listMenu();
  }

  listMenu() {
    this.menus = [
      { title: "Persuratan", icon: "mail", component: SuratPage },
      { title: "Personal", icon: "person", component: PersonalPage },
      { title: "APT", icon: "laptop", component: AptPage }
    ];

    return this.menus;
  }

  pagesTo(component: any) {
    this.navCtrl.push(component);
  }

  logout() {
    this.userProvider.purgeAuth();
    this.navCtrl.setRoot(LoginPage);
  }
}
