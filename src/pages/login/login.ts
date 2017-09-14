import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";

import { User } from "../../models/users";
import { UserProvider } from "../../providers/user/user";
import { HomePage } from "../home/home";
import { TokenProvider } from "../../providers/token/token";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user = {} as User;
  error: any = false;
  isLoading: boolean = false;
  params: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public tokenProvider: TokenProvider,
    public toastController: ToastController
  ) {
    this.params.data = {
      username: "Username",
      password: "Password",
      register: "Register",
      login: "Login",
      skip: "Skip",
      logo: "assets/logo_keuangan.png",
      backgroundImage: "icon-account",
      iconAccount: "icon-key",
      iconKey: "",
      iconLock: "assets/images/background/loginlight.jpg"
    };

    this.params.events = {
      onLogin: function(params) {
        this.login(params);
      },
      onRegister: function(params) {
        console.log("onRegister:" + JSON.stringify(params));
      },
      onSkip: function(params) {
        console.log("onSkip:" + JSON.stringify(params));
      },
      onFacebook: function(params) {
        console.log("onFacebook:" + JSON.stringify(params));
      },
      onTwitter: function(params) {
        console.log("onTwitter:" + JSON.stringify(params));
      },
      onGoogle: function(params) {
        console.log("onGoogle:" + JSON.stringify(params));
      },
      onPinterest: function(params) {
        console.log("onPinterest:" + JSON.stringify(params));
      }
    };
  }

  ionViewDidLoad() {}

  login(user: User) {
    this.isLoading = true;

    this.userProvider.attemptAuth(user).subscribe(
      data => this.navCtrl.setRoot(HomePage),
      err => {
        this.isLoading = false;

        // toast error
        this.toastController
          .create({
            message: err.error_message,
            duration: 3000,
            position: "bottom"
          })
          .present();
      }
    );
  }
}
