import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";

import { MenuHomeConstant } from "../../constant/menu-home";
import { HomeProvider } from "../../providers/home/home";
import { Observable } from "rxjs/Observable";

import "rxjs/add/observable/zip";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  menus: Array<any> = [];
  backgroundImage: string = "assets/images/bg_login.png";
  notifications: Array<any> = [];
  profile: any = {};
  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    private homeProvider: HomeProvider
  ) {}

  ionViewDidLoad() {
    this.listMenu();
    this.initData();
  }

  listMenu() {
    this.menus = MenuHomeConstant.getMenus();
    return this.menus;
  }

  mappingResponNotif(res?: any) {
    return this.menus.map((data, index) => {
      data.notificationTotal = this.setNotificationTotal(data.title, res);
    });
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
      err => {
        console.log(err);
      }
    );
  }

  private assets(name: string) {
    return `assets/icon/${name}.png`;
  }

  initData() {
    const getProfile = this.userProvider.getProfile();
    const getTotalNotif = this.homeProvider.getTotalNotication();

    Observable.zip(getProfile, getTotalNotif).subscribe(
      ([profile, totalNotif]) => {
        this.profile = profile;
        this.mappingResponNotif(totalNotif);
      }
    );
  }
}
