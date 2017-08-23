import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";

import { User } from "../../models/users";
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
  providers: [UserProvider]
})
export class LoginPage {
  user = {} as User;
  error: any = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  login(user: User) {
    let loader = this.loadingCtrl.create({ content: "loading....." });
    // mapping credential data
    let credentials = { user: user };

    loader.present().then(() => {
        this.userProvider
          .attemptAuth(credentials)
          .subscribe(
          data => {
            // console.log(data);
            
            loader.dismiss()
          },
            err => {
              console.log(credentials);

              loader.dismiss();
            }
          );
      })
      .catch(e => {
        loader.dismiss();
      });
  }
}
