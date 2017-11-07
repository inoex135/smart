import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { LoginPage } from "../login/login";

import { MenuHomeConstant } from "../../constant/menu-home";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  menus: Array<any> = [];
  backgroundImage: string = "assets/images/bg_login.png";

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider
  ) {}

  ionViewDidLoad() {
    this.listMenu();
  }

  listMenu() {
    this.menus = MenuHomeConstant.getMenus();
    return this.menus;
  }

  pagesTo(component: any) {
    this.navCtrl.push(component);
  }

  logout() {
    this.userProvider.purgeAuth();
    this.navCtrl.setRoot("LoginPage");
  }

  private assets(name: string) {
    return `assets/icon/${name}.png`;
  }
}
