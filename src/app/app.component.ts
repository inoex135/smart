import { Component } from "@angular/core";
import { Platform, NavController, App } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { UserProvider } from "../providers/user/user";
import { TokenProvider } from "../providers/token/token";
import { FCM } from "@ionic-native/fcm";

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

      // this.fcmTesting();
    });
  }
  fcmTesting() {
    if (this.platform.is("android")) {
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          alert("Received in background");
        } else {
          alert("Received in foreground");
        }
      });
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
    this.token.getToken().then(token => {
      if (token) {
        this.rootPage = "HomePage";
        // this.userProvider.populate();
      } else {
        this.rootPage = "LoginPage";
      }
    });
  }
}
