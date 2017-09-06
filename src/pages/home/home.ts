import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';

import { TokenProvider } from '../../providers/token/token';
import { SuratProvider } from '../../providers/surat/surat';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public suratProvider: SuratProvider,
  ) { }

  
  logout() {
    this.userProvider.purgeAuth();
    this.navCtrl.setRoot(LoginPage);
  }

  goToSurat() { }
}
