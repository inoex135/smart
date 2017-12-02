import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { PersonalAgendaDetailProvider } from "../../providers/personal-agenda-detail/personal-agenda-detail";
import { ToastHelper } from "../../helpers/toast-helper";
import { TokenProvider } from "../../providers/token/token";
import { MasterUnitProvider } from "../../providers/master-unit/master-unit";
import { MasterPegawaiProvider } from "../../providers/master-pegawai/master-pegawai";

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

  err: any = "";
  isSekretaris: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private agenda: PersonalAgendaDetailProvider,
    private viewCtrl: ViewController,
    private toast: ToastHelper,
    private tokenProvider: TokenProvider,
    private masterUnit: MasterUnitProvider,
    private masterPegawai: MasterPegawaiProvider
  ) {
    this.tokenProvider.getProfile().then(res => {
      this.isSekretaris = this.tokenProvider.latestProfile.is_sekretaris;
    });
  }

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
    this.agenda.update(agendaId, this.agendaData).subscribe(
      res => {
        this.toast.present(res.messages);
        this.dismiss();
      },
      err => {
        const errorRespon = err.error ? err.error : err.errors;
        this.err = errorRespon;
        this.toast.present(err.error_code);
      }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addData(data: Array<any>, item: any) {
    data.push(item);
  }

  removeData(data: Array<any>, index: number) {
    data.splice(index, 1);
  }
}
