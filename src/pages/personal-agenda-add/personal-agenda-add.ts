import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DatepickerProvider } from "../../providers/datepicker/datepicker";
import { PersonalProvider } from "../../providers/personal/personal";
import { IAgendaAdd } from "../../interface/agenda-add";
import * as moment from "moment";

@IonicPage()
@Component({
  selector: "page-personal-agenda-add",
  templateUrl: "personal-agenda-add.html"
})
export class PersonalAgendaAddPage {
  private agendaData: IAgendaAdd = {
    tanggal_mulai: "",
    jam_mulai: "",
    tanggal_akhir: "",
    jam_akhir: "",
    uraian: "",
    lokasi: "",
    unit: "",
    pegawai: ""
  };

  peserta: string = "";

  readonly MODE = { DATE: "date", TIME: "time" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePicker: DatepickerProvider,
    private personalProvider: PersonalProvider
  ) {}

  ionViewDidLoad() {}

  async tanggalMulai() {
    const date = await this.datePicker.datePickerData(this.MODE.DATE);
    this.agendaData.tanggal_mulai = this.convertDatepickerDate(date);
  }

  async jamMulai() {
    const jamMulai = await this.datePicker.datePickerData(this.MODE.TIME);
    this.agendaData.jam_mulai = this.convertDatepickerDate(jamMulai, "HH:mm");
  }

  async tanggalAkhir() {
    const tanggalAkhir = await this.datePicker.datePickerData(this.MODE.DATE);
    this.agendaData.tanggal_akhir = this.convertDatepickerDate(tanggalAkhir);
  }

  async jamAkhir() {
    const jamAkhir = await this.datePicker.datePickerData(this.MODE.TIME);
    this.agendaData.jam_akhir = this.convertDatepickerDate(jamAkhir, "HH:mm");
  }
  convertDatepickerDate(date: any, format: any = "DD-MM-YYYY") {
    return moment(date, moment.ISO_8601).format(format);
  }

  tambahAgenda() {
    this.personalProvider
      .tambahAgenda(this.agendaData)
      .subscribe(res => console.log(res), err => console.log(err));
  }

  // addPeserta(peserta: string) {
  //   this.agendaData.peserta.push({ nama: peserta });
  //   console.log(this.agendaData.peserta);
  // }

  // removePeserta(index: number) {
  //   this.agendaData.peserta.splice(index, 1);
  // }
}
