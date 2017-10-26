import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { LoginPage } from "../login/login";
import { SuratPage } from "../surat/surat";
import { PersonalPage } from "../personal/personal";
import { AptPage } from "../apt/apt";
import { HomePopoverPage } from "../home-popover/home-popover";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public menus: Array<any> = [];

  backgroundImage: string = "assets/images/bg_login.png";

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider
  ) {}

  ionViewDidLoad() {
    this.listMenu();
  }

  listMenu() {
    this.menus = [
      {
        title: "PERSURATAN",
        subtitle: "Pemberitahuan Persuratan",
        icon: "mail",
        component: SuratPage,
        color: "blue-light"
      },
      {
        title: "PERSONAL",
        subtitle: "Pemberitahuan Kalender Kegiatan",
        icon: "calendar",
        component: PersonalPage,
        color: "orange"
      },
      {
        title: "APT",
        subtitle: "Pemberitahuan Supervisi",
        icon: "checkmark-circle-outline",
        component: AptPage,
        color: "green"
      }
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
