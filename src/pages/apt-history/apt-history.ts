import { Component } from "@angular/core";
import { NavParams, NavController, IonicPage } from "ionic-angular";

@Component({
  selector: "page-apt-history",
  templateUrl: "apt-history.html"
})
@IonicPage()
export class AptHistoryPage {

  static TAG:string = 'AptHistoryPage'

  action: string;
  itemId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    
  }
}
