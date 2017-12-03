import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";

import { MenuHomeConstant } from "../../constant/menu-home";
import { HomeProvider } from "../../providers/home/home";
import { Observable } from "rxjs/Observable";

import "rxjs/add/observable/zip";
import { LoaderHelper } from "../../helpers/loader-helper";
import { FCM } from "@ionic-native/fcm";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  menus: Array<any> = [];
  backgroundImage: string = "assets/images/bg_login.png";
  notifications: Array<any> = [];
  profile: any = {};

  profileName: string = "";

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public fcm: FCM,
    private homeProvider: HomeProvider,
    private loaderHelper: LoaderHelper
  ) {}

  ionViewDidLoad() {
    this.listMenu();
    this.initData();
    this.fcmGetToken();
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
    this.loaderHelper.createLoader();
    this.userProvider.logout().subscribe(
      () => {
        this.userProvider.purgeAuth();
        this.navCtrl.setRoot("LoginPage");
        this.loaderHelper.dismiss();
      },
      err => {
        this.userProvider.purgeAuth();
        this.loaderHelper.dismiss();
        this.navCtrl.push("LoginPage");
      }
    );
  }

  private assets(name: string) {
    return `assets/icon/${name}.png`;
  }

  fcmGetToken() {
    this.fcm.getToken().then(token => {
      this.userProvider.saveFcmToken(token).subscribe();
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      this.userProvider.saveFcmToken(token).subscribe();
    });
  }

  initData() {
    const getProfile = this.userProvider.getProfile();
    const getTotalNotif = this.homeProvider.getTotalNotication();

    Observable.zip(getProfile, getTotalNotif).subscribe(
      ([profile, totalNotif]) => {
        this.profile = profile;
        this.profileName = profile.nama;

        this.mappingResponNotif(totalNotif);
      },
      err => false
    );
  }
}
