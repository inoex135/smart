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
  tab1Root = "AptPage";
  tab2Root = "AptPage";
  tab3Root = "AptPage";

  params: {} = {
    PERMOHONAN_MASUK: "permohonanMasuk",
    DEKAT_BATAS_WAKTU: "dekatBatasWaktu",
    LEWAT_BATAS_WAKTU: "lewatBatasWaktu"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TabsPage");
  }
}
