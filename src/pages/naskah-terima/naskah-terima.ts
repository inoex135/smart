import { Component } from "@angular/core";
import { IonicPage, ViewController } from "ionic-angular";
import { DatepickerProvider } from "../../providers/datepicker/datepicker";
import { MomentHelper } from "../../helpers/moment-helper";
import { NaskahMasukProvider } from "../../providers/naskah-masuk/naskah-masuk";

@IonicPage()
@Component({
  selector: "page-naskah-terima",
  templateUrl: "naskah-terima.html"
})
export class NaskahTerimaPage {
  // param untuk terima naskah
  nip: number;
  tanggalTerima: any;

  //variabel penerima naskah
  personils: any[] = [];

  constructor(
    private viewCtrl: ViewController,
    private datepicker: DatepickerProvider,
    private momentHelper: MomentHelper,
    private naskahProvider: NaskahMasukProvider
  ) {}

  ionViewDidLoad() {
    this.getPenerima();
  }

  async getTanggalTerima() {
    try {
      const date = await this.datepicker.datePickerData("date");
      this.tanggalTerima = this.momentHelper.convertIsoTo(date, "DD-MM-YYYY");
    } catch (error) {}
  }

  dismiss() {
    const data = { nip: this.nip, tanggalTerima: this.tanggalTerima };
    this.viewCtrl.dismiss(data);
  }

  getPenerima() {
    this.naskahProvider.getPenerimaNaskah().subscribe(res => {
      this.personils = res;
    });
  }

  //save data naskah terima
  simpan() {}
}
