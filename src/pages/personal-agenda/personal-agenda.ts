import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TimelineDummy } from "../../dummy/timeline.dummy";
import { TimelineType } from "../../constant/TimelineType";

@IonicPage()
@Component({
  selector: "page-personal-agenda",
  templateUrl: "personal-agenda.html"
})
export class PersonalAgendaPage {
  public items: any = TimelineDummy.agenda();
  public type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = TimelineType.AGENDA;
  }

  ionViewDidLoad() {}

  detailAgenda(event) {
    this.navCtrl.push("PersonalAgendaDetailPage", { agendaId: event });
  }
}
