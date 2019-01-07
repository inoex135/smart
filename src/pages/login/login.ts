import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  IonicPage,
  Platform
} from "ionic-angular";

import { User } from "../../models/users";
import { UserProvider } from "../../providers/user/user";
import { TokenProvider } from "../../providers/token/token";
import { LoginState } from "../../models/login-state.model";
import { LogUtil } from "../../utils/logutil";
@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {

  TAG:string = 'LoginPage'

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
    public toastController: ToastController,
    public platform: Platform
  ) {
    let self = this;
    this.params.data = {
      login: "Login",
      logo: "assets/logo/kemenkeu.png",
      backgroundImage: "assets/images/bg_login_smart.png"
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
      data => {
        LogUtil.d(this.TAG, data)
        setTimeout(() => {
          this.navCtrl.setRoot("HomePage")
        }, 1000)
      },
      err => {
        console.log(err)
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

    if (this.platform.is('android') || this.platform.is('ios')) {
      LogUtil.d(this.TAG, 'mobile platform using web base')
      this.navCtrl.push('LoginSso')
    } else {
      this.loginState.isLogin = true;
      this.loginState.sso = true;

      // login http
      this.userProvider.attemptAuthSso(user).subscribe(
        data => { 
          LogUtil.d(this.TAG, data)
          this.navCtrl.setRoot("HomePage")
        },
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
}
