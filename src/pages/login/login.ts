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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public tokenProvider: TokenProvider,
    public toastController: ToastController
  ) {
    this.user.username = "198604122007101001";
    this.user.password = "sm4rt@DJKN";
  }

  ionViewDidLoad() {}

  login(user: User) {
    this.isLoading = true;

    this.userProvider.attemptAuth(user).subscribe(
      data => {
        this.navCtrl.setRoot(HomePage);
      },
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
