import { Component } from "@angular/core";
import { IonicPage, ViewController } from "ionic-angular";
import { DatepickerProvider } from "../../providers/datepicker/datepicker";
import { MomentHelper } from "../../helpers/moment-helper";

@IonicPage()
@Component({
  selector: "page-naskah-terima",
  templateUrl: "naskah-terima.html"
})
export class NaskahTerimaPage {
  nip: number;
  tanggalTerima: any;

  constructor(
    private viewCtrl: ViewController,
    private datepicker: DatepickerProvider,
    private momentHelper: MomentHelper
  ) {}

  ionViewDidLoad() {}

  async getTanggalTerima() {
    try {
      const endTime = await this.datepicker.datePickerData("date");
      this.tanggalTerima = this.momentHelper.convertIsoTo(
        endTime,
        "DD-MM-YYYY"
      );
    } catch (error) {}
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
