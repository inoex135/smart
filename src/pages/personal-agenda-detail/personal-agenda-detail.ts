import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PersonalAgendaDetailProvider } from "../../providers/personal-agenda-detail/personal-agenda-detail";

@IonicPage()
@Component({
  selector: "page-personal-agenda-detail",
  templateUrl: "personal-agenda-detail.html"
})
export class PersonalAgendaDetailPage {
  detailAgenda: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private agendaProvider: PersonalAgendaDetailProvider
  ) {
    console.log(this.navParams.get("date"));

    this.getDetailAgenda();
  }

  ionViewDidLoad() {}

  getDetailAgenda() {
    const date = this.navParams.get("date");
    const agenda = this.agendaProvider.getDetailAgenda(date);

    agenda.subscribe(res => (this.detailAgenda = res), err => false);
  }
}
