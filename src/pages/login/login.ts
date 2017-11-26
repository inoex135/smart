import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  IonicPage
} from "ionic-angular";

import { User } from "../../models/users";
import { UserProvider } from "../../providers/user/user";
import { HomePage } from "../home/home";
import { TokenProvider } from "../../providers/token/token";
import { LoginState } from "../../models/login-state.model";
@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user = {} as User;
  error: any = false;
  isLoading: boolean = false;
  params: any = {};

  loginState: LoginState = {
    isLogin: false,
    sso: false
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public tokenProvider: TokenProvider,
    public toastController: ToastController
  ) {
    let self = this;
    this.params.data = {
      login: "Login",
      logo: "assets/logo/kemenkeu.png",
      backgroundImage: "assets/images/bg_login.png"
    };

    this.params.events = {
      onLogin: function(params) {
        self.login(params);
      },
      onLoginSSO: function(params) {
        self.loginSSO(params);
      }
    };
  }

  ionViewDidLoad() {}

  login(user: User) {
    this.loginState.isLogin = true;

    this.userProvider.attemptAuth(user).subscribe(
      data => this.navCtrl.setRoot(HomePage),
      err => {
        this.loginState.isLogin = false;

        // toast error
        this.toastController
          .create({
            message: err,
            duration: 3000,
            position: "bottom"
          })
          .present();
      }
    );
  }

  loginSSO(user: User) {
    // as flag show loader spinner dan disable button
    this.loginState.isLogin = true;
    this.loginState.sso = true;

    // login http
    this.userProvider.attemptAuthSso(user).subscribe(
      data => this.navCtrl.setRoot(HomePage),
      err => {
        // as flag untuk hide loader spinner dan un-disable button
        this.loginState.isLogin = false;
        this.loginState.sso = false;

        // show toast when get error
        this.toastController
          .create({
            message: err,
            duration: 3000,
            position: "bottom"
          })
          .present();
      }
    );
  }
}
