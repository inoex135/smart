import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { User } from "../../models/users";

@IonicPage()
@Component({
  selector: "page-sso",
  templateUrl: "sso.html"
})
export class SsoPage {
  private params: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    let self = this;

    this.params.data = {
      login: "Sign In",
      logo: "assets/logo/sso_lock.png",
      backgroundImage: "assets/images/bg_login.png"
    };

    this.params.events = {
      onLoginSSO: function(params) {
        self.loginSSO(params);
      }
    };
  }

  loginSSO(user: User) {}
}
