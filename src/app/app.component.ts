import { Component } from "@angular/core";
import { Platform, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { LoginPage } from "../pages/login/login";
import { UserProvider } from "../providers/user/user";
import { TokenProvider } from "../providers/token/token";
import { HomePage } from "../pages/home/home";
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
    public token: TokenProvider
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
    });
  }

  registerBackButton(): void {
    document.addEventListener("backbutton", () => {
      let nav = this.nav;
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
        this.rootPage = HomePage;
        // this.userProvider.populate();
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}
