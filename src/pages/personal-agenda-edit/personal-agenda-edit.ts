import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { PersonalProvider } from "../../providers/personal/personal";
import { IAgendaAdd } from "../../interface/agenda-add";
import { PersonalAgendaDetailProvider } from "../../providers/personal-agenda-detail/personal-agenda-detail";
import { ToastHelper } from "../../helpers/toast-helper";

@IonicPage()
@Component({
  selector: "page-personal-agenda-edit",
  templateUrl: "personal-agenda-edit.html"
})
export class PersonalAgendaEditPage {
  private agendaData: any = {
    tanggal_mulai: "",
    waktu_mulai: "",
    tanggal_akhir: "",
    waktu_akhir: "",
    uraian: "",
    lokasi: "",
    unit: [],
    pegawai: []
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private agenda: PersonalAgendaDetailProvider,
    private viewCtrl: ViewController,
    private toast: ToastHelper
  ) {}

  ionViewDidLoad() {
    this.edit();
  }

  edit() {
    const agendaId = this.navParams.get("agendaId");
    this.agenda
      .edit(agendaId)
      .subscribe(res => (this.agendaData = res), err => true);
  }

  update(agendaId: number) {
    this.agenda.update(agendaId).subscribe(
      res => {
        this.toast.present(res.message);
        this.dismiss();
      },
      err => {
        this.toast.present(err);
        this.dismiss();
      }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
