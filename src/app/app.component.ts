import { Component } from "@angular/core";
import { Platform, NavController, App } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { UserProvider } from "../providers/user/user";
import { TokenProvider } from "../providers/token/token";
import { FCM } from "@ionic-native/fcm";
import { LogUtil } from "../utils/logutil";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;
  nav: NavController;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userProvider: UserProvider,
    public token: TokenProvider,
    public fcm: FCM,
    public app: App
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // set root page
      this.initHomePage();

      // set backButton hardware android
      this.registerBackButton();

      this.fcmTesting();
    });
  }

  fcmTesting() {
    if (this.platform.is("android") || this.platform.is("ios")) {
      this.fcm.onNotification().subscribe(data => {
        LogUtil.d('APP', data)
      })
    }
  }

  registerBackButton(): void {
    document.addEventListener("backbutton", () => {
      let nav: NavController = this.nav;
      if (nav.canGoBack()) {
        nav.pop();
      } else {
        this.platform.exitApp();
      }
    });
  }

  initHomePage(): void {
    LogUtil.d('App', 'set user data')
    this.token.setCurrentUserDataFirst()
    .then(token => {
      if (token) {
        this.rootPage = "HomePage"
      } else {
        this.rootPage = "LoginPage"
      }
    })
    .catch(error => {
      LogUtil.d('App', 'catch error here')
      LogUtil.e('App', error)
      this.rootPage = "LoginPage"
    })
  }
}
