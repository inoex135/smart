import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  // root link when tabs is click
  tab1Root = "AptPage";

  params: {} = {
    PERMOHONAN_MASUK: "permohonanMasuk",
    DEKAT_BATAS_WAKTU: "dekatBatasWaktu",
    LEWAT_BATAS_WAKTU: "lewatBatasWaktu"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}
}
