import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TimelineDummy } from "../../dummy/timeline.dummy";

@IonicPage()
@Component({
  selector: "page-personal-agenda",
  templateUrl: "personal-agenda.html"
})
export class PersonalAgendaPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  items: any = TimelineDummy.agenda();

  ionViewDidLoad() {}

  detailAgenda(event) {
    this.navCtrl.push("PersonalAgendaDetailPage", { agendaId: event });
  }
}
