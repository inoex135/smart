import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, Platform, IonicPage } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";

import { MenuHomeConstant } from "../../constant/menu-home";
import { HomeProvider } from "../../providers/home/home";
import { Observable } from "rxjs/Observable";

import "rxjs/add/observable/zip";
import { LoaderHelper } from "../../helpers/loader-helper";
import { FCM } from "@ionic-native/fcm";
import { TokenProvider } from "../../providers/token/token";
import { ToastHelper } from "../../helpers/toast-helper";
import { Storage } from "@ionic/storage";
import { LogUtil } from "../../utils/logutil";
@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  TAG:string = 'HomePage'

  @ViewChild("profileImage") image: ElementRef;

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
    private loaderHelper: LoaderHelper,
    private token: TokenProvider,
    private toast: ToastHelper,
    private platform: Platform,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    this.listMenu();
    this.initData();
    this.platform.ready().then(() => {
      this.fcmGetToken();
    });
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
        this.navCtrl.setRoot("LoginPage");
      }
    );
  }

  private assets(name: string) {
    return `assets/icon/${name}.png`;
  }

  fcmGetToken() {
    this.fcm.getToken().then(
      token => {
        this.userProvider.saveFcmToken(token).subscribe();
      },
      err => {}
    );
    this.fcm.onTokenRefresh().subscribe(
      token => {
        this.userProvider.saveFcmToken(token).subscribe();
      },
      err => {}
    );
  }

  async initData() {
    const profile = await this.token.getProfile();
    const getTotalNotif = await this.homeProvider.getTotalNotication();

    this.homeProvider.getPhotoProfile().subscribe(
      res => {
        if (res != null) {
          this.image.nativeElement.src = URL.createObjectURL(res)
        }
      }
    );

    // get profile dari localStorage jika sudah ada
    if (profile) {
      this.profile = profile;
      this.profileName = profile.nip;
      getTotalNotif.subscribe(
        res => this.mappingResponNotif(res),
        err => {
          this.userProvider.purgeAuth();
          this.navCtrl.setRoot("LoginPage");
        }
      );
    } else {
      const getProfile = this.userProvider.getProfile();

      Observable.zip(getProfile, getTotalNotif).subscribe(
        ([profile, totalNotif]) => {
          this.profile = profile;
          this.profileName = profile.nip;

          this.mappingResponNotif(totalNotif);
        },
        err => false
      );
    }
  }

  //  by pass plt/plh
  byPass(nip: string) {
    //cek apakah nip yg di select, sama dengan currentUser
    if (nip == this.profile.nip) {
      //jika ada, ubah token kembali dengan user asli/bukan plt -plh nya
      this.storage.get("token").then(res => {
        this.token.latestToken = res;
        this.initData();
      }, err => true);
    } else {
      this.loaderHelper.createLoader();
      this.userProvider.byPass(nip).subscribe(
        res => {
          this.token.saveTokenPltPlh(res);
          this.initData();
          this.loaderHelper.dismiss();
        },
        err => {
          this.loaderHelper.dismiss();
          this.toast.present(err.error_message);
        }
      );
    }
  }
}
