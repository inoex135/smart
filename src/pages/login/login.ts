import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { User } from "../../models/users";
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { TokenProvider } from '../../providers/token/token';

/**
* Generated class for the LoginPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
  // providers: [UserProvider]
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
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

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
            message: "username atau password anda tidak cocok!",
            duration: 3000,
            position: "bottom"
          }).present();
      }
    );
  }
}