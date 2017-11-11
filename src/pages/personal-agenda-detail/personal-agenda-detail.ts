import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-personal-agenda-detail",
  templateUrl: "personal-agenda-detail.html"
})
export class PersonalAgendaDetailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PersonalAgendaDetailPage");
  }
}
