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
  ) {}

  ionViewDidLoad() {
    this.getDetailAgenda();
  }

  getDetailAgenda() {
    this.detailAgenda = this.agendaProvider.getDetailAgenda(true);
  }
}
