import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DatepickerProvider } from "../../providers/datepicker/datepicker";

@IonicPage()
@Component({
  selector: "page-personal-agenda-add",
  templateUrl: "personal-agenda-add.html"
})
export class PersonalAgendaAddPage {
  private agendaData: any = {
    tanggalMulai: "",
    waktuMulai: "",
    tanggalAkhir: "",
    waktuAkhir: "",
    uraian: "",
    lokasi: "",
    peserta: []
  };

  peserta: string = "";

  readonly MODE = { DATE: "date", TIME: "time" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePicker: DatepickerProvider
  ) {}

  ionViewDidLoad() {}

  async tanggalMulai() {
    this.agendaData.tanggalMulai = await this.datePicker.datePickerData(
      this.MODE.DATE
    );
    alert(this.agendaData.tanggalMulai);
  }

  async jamMulai() {
    this.agendaData.waktuMulai = await this.datePicker.datePickerData(
      this.MODE.TIME
    );
  }

  async tanggalAkhir() {
    this.agendaData.tanggalAkhir = await this.datePicker.datePickerData(
      this.MODE.DATE
    );
  }

  async jamAkhir() {
    this.agendaData.jamAkhir = await this.datePicker.datePickerData(
      this.MODE.TIME
    );
  }

  addPeserta(peserta: string) {
    this.agendaData.peserta.push({ nama: peserta });
    console.log(this.agendaData.peserta);
  }

  removePeserta(index: number) {
    this.agendaData.peserta.splice(index, 1);
  }
}
