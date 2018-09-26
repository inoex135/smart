import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DatepickerProvider } from "../../providers/datepicker/datepicker";
import { PersonalProvider } from "../../providers/personal/personal";
import { IAgendaAdd } from "../../interface/agenda-add";
import { AutoCompleteComponent } from "ionic2-auto-complete";
import { MomentHelper } from "../../helpers/moment-helper";
import { ToastHelper } from "../../helpers/toast-helper";
import { TokenProvider } from "../../providers/token/token";

@IonicPage()
@Component({
  selector: "page-personal-agenda-add",
  templateUrl: "personal-agenda-add.html"
})
export class PersonalAgendaAddPage {
  isSekretaris: boolean = false;
  isDisabled: boolean = false;

  private agendaData: IAgendaAdd = {
    tanggal_mulai: "",
    jam_mulai: "",
    tanggal_akhir: "",
    jam_akhir: "",
    uraian: "",
    lokasi: "",
    unit: [],
    pegawai: [],
    is_sekretaris: "0"
  };

  peserta: string = "";

  readonly MODE = { DATE: "date", TIME: "time" };

  @ViewChild("searchbar") searchbar: AutoCompleteComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePicker: DatepickerProvider,
    private personalProvider: PersonalProvider,
    private momentHelper: MomentHelper,
    private toastHelper: ToastHelper,
    private tokenProvider: TokenProvider
  ) {}

  ionViewDidLoad() {
    this.tokenProvider.getProfile().then(res => {
      this.isSekretaris = this.tokenProvider.latestProfile.is_sekretaris;
    });
  }

  async tanggalMulai() {
    try {
      const tanggalMulai = await this.datePicker.datePickerData(this.MODE.DATE);
      this.agendaData.tanggal_mulai = this.momentHelper.convertIsoTo(
        tanggalMulai,
        "DD-MM-YYYY"
      );
    } catch (error) {}
  }

  async jamMulai() {
    try {
      const jamMulai = await this.datePicker.datePickerData(this.MODE.TIME);
      this.agendaData.jam_mulai = this.momentHelper.convertIsoTo(
        jamMulai,
        "HH:mm"
      );
    } catch (error) {}
  }

  async tanggalAkhir() {
    try {
      const tanggalAkhir = await this.datePicker.datePickerData(this.MODE.DATE);
      this.agendaData.tanggal_akhir = this.momentHelper.convertIsoTo(
        tanggalAkhir,
        "DD-MM-YYYY"
      );
    } catch (error) {}
  }

  async jamAkhir() {
    try {
      const jamAkhir = await this.datePicker.datePickerData(this.MODE.TIME);
      this.agendaData.jam_akhir = this.momentHelper.convertIsoTo(
        jamAkhir,
        "HH:mm"
      );
    } catch (error) {}
  }

  tambahAgenda() {
    this.isDisabled = true;
    this.personalProvider.tambahAgenda(this.agendaData).subscribe(
      res => {
        this.isDisabled = false;
        this.toastHelper.present(res.messages);
        this.navCtrl.pop();
      },
      err => {
        this.isDisabled = false;
        this.toastHelper.present(err.errors[0].message);
      }
    );
  }

  addData(data: Array<any>, item: any) {
    data.push(item);
  }

  removeData(data: Array<any>, index: number) {
    data.splice(index, 1);
  }
}
