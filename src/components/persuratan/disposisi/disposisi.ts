import { Component, Input } from "@angular/core";
import { NaskahDisposisiProvider } from "../../../providers/naskah-disposisi/naskah-disposisi";
import { Observable } from "rxjs/Observable";
import { IDisposisiUnit } from "../../../interface/disposisi-unit";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ToastHelper } from "../../../helpers/toast-helper";
import { MomentHelper } from "../../../helpers/moment-helper";
import { DatepickerProvider } from "../../../providers/datepicker/datepicker";
import { NavController } from "ionic-angular";
import { MasterPegawaiProvider } from "../../../providers/master-pegawai/master-pegawai";

@Component({
  selector: "disposisi",
  templateUrl: "disposisi.html"
})
export class Disposisi {
  datas: any = {};
  Picker: string = new Date().toISOString();
  unit: Array<any> = [];
  selectedUnit: Array<any> = [];
  lead: Array<string> = [];
  message: string = "";

  pelaku: string;

  disposisi: any = {
    personal: "",
    selaku: "",
    sifatSurat: "",
    catatan: "",
    tanggalSelesai: "",
    tanggal: "",
    sumasId: "",
    petunjuk: [],
    unitTujuan: [],
    leader: ""
  };

  disposisiAs: string = "";
  @Input() naskahId: any;
  sumasId: any;

  readonly selectAs: any = {
    unit: "UNIT",
    personal: "PERSONAL"
  };

  // untuk menampilkan label ketika pilih unit
  readonly selectUnitDisposisi: Array<string> = ["UNIT", "PERSONAL"];

  disposisiTarget: { unit: boolean; personal: boolean } = {
    unit: false,
    personal: false
  };

  //query string
  autocompleteItems: any = [];
  queryString: any = [];

  component: any = {
    unitOrPersonal: true,
    disposisiUnit: false,
    disposisiPersonal: false,
    disposisiSifat: false,
    disposisiPetunjuk: false,
    disposisiTanggal: false
  };

  constructor(
    private disposisiProvider: NaskahDisposisiProvider,
    private toastHelper: ToastHelper,
    private momentHelper: MomentHelper,
    private datepickerProvider: DatepickerProvider,
    private navCtrl: NavController,
    private masterPegawai: MasterPegawaiProvider
  ) {
    this.init();
  }

  init() {
    const petunjuk = this.disposisiProvider.getPetunjuk();
    const unitDisposisi = this.disposisiProvider.getUnitDisposisi();
    const sifatSurat = this.disposisiProvider.getSifatSurat();

    Observable.zip(petunjuk, unitDisposisi, sifatSurat).subscribe(
      ([petunjuk, unitDisposisi, sifatSurat]) => {
        this.datas.jabatan = unitDisposisi;
        this.datas.petunjuk = petunjuk;
        this.datas.sifatSurat = sifatSurat;
      }
    );
  }

  selectDisposisi(target: string) {
    if (target === this.selectAs.unit) {
      this.disposisiTarget.unit = !this.disposisiTarget.unit;
    }

    if (target === this.selectAs.personal) {
      this.disposisiTarget.personal = !this.disposisiTarget.personal;
    }
  }

  // CHECKBOX
  // untuk get dan remove value checkbox unit
  // remove by index dari unit yg di klik
  // dan add by index yang di klik
  selectUnit(unit: IDisposisiUnit) {
    let unitIndex = this.disposisi.unitTujuan.indexOf(unit.kode_utuh);

    if (unitIndex !== -1) {
      this.disposisi.unitTujuan.splice(unitIndex, 1);
    } else {
      this.disposisi.unitTujuan.push({
        kode_utuh: unit.kode_utuh,
        uraian_jabatan: unit.uraian_jabatan
      });
    }
  }

  searchPegawai(param: any) {
    this.disposisiProvider
      .searchPegawai(param)
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe(
        res => {
          this.autocompleteItems = res.content.map(res => {
            return res.nip;
          });
        },
        err => {}
      );
  }
  onChange(petunjuk: string, checked: boolean, id: number) {
    if (checked) {
      this.disposisi.petunjuk.push(petunjuk);
    } else {
      this.disposisi.petunjuk.splice(id, 1);
    }
  }
  // setLead(event: any, unit: any) {
  //   // @TODO: selectedUnit msh duplikat
  //   // jika checkbox di select setelah itu di uncheck,
  //   // kemudian di cheklist lagi
  //   if (event.checked) {
  //     //this.selectedUnit.push(unit);
  //     this.disposisi.lead = unit;
  //   }
  // }

  addData(data: Array<any>, item: any) {
    data.push(item);
  }

  removeData(data: Array<any>, index: number) {
    data.splice(index, 1);
  }

  addPersonal() {}
  nextStep(to: any = "root") {
    setTimeout(true, 5000);
    if (to.unit) {
      this.component.unitOrPersonal = false;
      this.component.disposisiUnit = true;
    }

    if (to.personal) {
      this.component.disposisiPersonal = true;
      this.component.unitOrPersonal = false;
    }

    if (to === "disposisiSifat") {
      this.component.disposisiSifat = true;
      this.component.disposisiPersonal = false;
      this.component.disposisiUnit = false;
    }

    if (to === "disposisiPetunjuk") {
      this.component.disposisiPetunjuk = true;
      this.component.disposisiSifat = false;
    }

    if (to === "disposisiTanggal") {
      this.component.disposisiTanggal = true;
      this.component.disposisiPetunjuk = false;
    }

    // this.setDisposisiTarget(false);
  }

  setDisposisiTarget(status: boolean) {
    this.disposisiTarget.personal = status;
    this.disposisiTarget.unit = status;
  }

  back(to: string | any = "root") {
    if (to === "root") {
      this.component.unitOrPersonal = true;
      this.component.disposisiUnit = false;
      this.component.disposisiPersonal = false;
    }

    if (to === "disposisiPersonal" || to.personal) {
      this.component.disposisiPersonal = true;
      this.component.disposisiSifat = false;
    }

    if (to === "disposisiUnit" || to.unit) {
      this.component.disposisiUnit = true;
      this.component.disposisiSifat = false;
    }

    if (to === "disposisiSifat") {
      this.component.disposisiSifat = true;
      this.component.disposisiPetunjuk = false;
    }

    if (to === "disposisiPetunjuk") {
      this.component.disposisiPetunjuk = true;
      this.component.disposisiTanggal = false;
    }
  }

  async tanggalSelesaiPicker() {
    const tanggalMulai = await this.datepickerProvider.datePickerData("date");
    this.disposisi.tanggalSelesai = this.momentHelper.convertIsoTo(
      tanggalMulai,
      "DD-MM-YYYY"
    );
  }

  async tanggalDisposisiPicker() {
    const tanggalMulai = await this.datepickerProvider.datePickerData("date");
    this.disposisi.tanggalDisposisi = this.momentHelper.convertIsoTo(
      tanggalMulai,
      "DD-MM-YYYY"
    );
  }
  simpan() {
    this.disposisi.sumasId = this.naskahId;

    this.disposisiProvider.simpanDisposisi(this.disposisi).subscribe(
      res => {
        this.message = res.message;
        this.navCtrl.pop();
        this.toastHelper.present(this.message);
      },
      err => {
        console.log(err);
      }
    );
  }
}
