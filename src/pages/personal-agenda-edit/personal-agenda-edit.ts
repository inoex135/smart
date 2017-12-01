import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PersonalProvider } from "../../providers/personal/personal";
import { IAgendaAdd } from "../../interface/agenda-add";

@IonicPage()
@Component({
  selector: "page-personal-agenda-edit",
  templateUrl: "personal-agenda-edit.html"
})
export class PersonalAgendaEditPage {
  private agendaData: IAgendaAdd = {
    tanggal_mulai: "",
    jam_mulai: "",
    tanggal_akhir: "",
    jam_akhir: "",
    uraian: "",
    lokasi: "",
    unit: [],
    pegawai: []
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private personalProvider: PersonalProvider
  ) {}

  ionViewDidLoad() {
    this.edit();
  }

  edit() {
    const agendaId = this.navParams.get("agendaId");
    this.personalProvider
      .editAgenda(agendaId)
      .subscribe(res => {}, err => true);
  }
}
