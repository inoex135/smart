import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { UserProvider } from '../providers/user/user';
import { TokenProvider } from '../providers/token/token';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    userProvider: UserProvider,
    public token: TokenProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // set root page
      this.token.getToken().then(token => {
        if (token) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage
        }
      })
    });
  }
}

