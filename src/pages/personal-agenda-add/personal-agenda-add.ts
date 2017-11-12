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
    lokasi: ""
  };

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

  jamMulai() {
    this.agendaData.waktuMulai = this.datePicker.datePickerData(this.MODE.TIME);
  }

  tanggalAkhir() {
    this.agendaData.tanggalAkhir = this.datePicker.datePickerData(
      this.MODE.DATE
    );
  }

  jamAkhir() {
    this.agendaData.jamAkhir = this.datePicker.datePickerData(this.MODE.TIME);
  }
}
