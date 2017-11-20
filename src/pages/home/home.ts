import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";

import { MenuHomeConstant } from "../../constant/menu-home";
import { HomeProvider } from "../../providers/home/home";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  menus: Array<any> = [];
  backgroundImage: string = "assets/images/bg_login.png";
  notifications: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    private homeProvider: HomeProvider
  ) {}

  ionViewDidLoad() {
    this.listMenu();
    this.getTotalNotification();
  }

  listMenu() {
    this.menus = MenuHomeConstant.getMenus();
    return this.menus;
  }

  getTotalNotification() {
    this.homeProvider.getTotalNotication().subscribe(
      res => {
        this.menus.map((data, index) => {
          data.notificationTotal = this.setNotificationTotal(data.title, res);
        });
      },
      err => console.log(err)
    );
  }
  setNotificationTotal(title: any, res: any) {
    if (title === "PERSURATAN") return res.notification_persuratan;

    if (title === "PERSONAL") return res.notification_personal;

    if (title === "APT") return res.notification_apt;
  }

  pagesTo(component: any) {
    this.navCtrl.push(component);
  }

  logout() {
    this.userProvider.logout().subscribe(
      () => {
        this.userProvider.purgeAuth();
        this.navCtrl.setRoot("LoginPage");
      },
      err => alert("Terjadi Kesalahan")
    );
  }

  private assets(name: string) {
    return `assets/icon/${name}.png`;
  }
}
