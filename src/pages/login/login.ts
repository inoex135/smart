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

  loginSSO(user: User) {
    this.navCtrl.push("SsoPage");
  }
}
