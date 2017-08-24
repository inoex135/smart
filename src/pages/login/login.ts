import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";

import { User } from "../../models/users";
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { TokenProvider } from '../../providers/token/token';
import { ApiProvider } from '../../providers/api/api';

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
    public loadingCtrl: LoadingController,
    public tokenProvider: TokenProvider,
    public apiProvider: ApiProvider
  ) {}
  
  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
  
  login(user: User) {
    let loader = this.loadingCtrl.create({ content: "loading....." });
    // mapping credential data
    let credentials = { user: user };
    
    loader.present().then(() => { 
      this.userProvider.attemptAuth(credentials).subscribe(
        data => {
          loader.dismiss()
          this.navCtrl.setRoot(HomePage)
        },
        err => {
          loader.dismiss();
        }
      );
    })
    .catch(e => {
      loader.dismiss();
    });
  }
}
