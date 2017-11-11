import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-personal-agenda",
  templateUrl: "personal-agenda.html"
})
export class PersonalAgendaPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PersonalAgendaPage");
  }

  detailAgenda() {
    this.navCtrl.push("PersonalAgendaDetailPage");
  }
}
