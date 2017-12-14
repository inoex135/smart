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
import { UserProvider } from "../../../providers/user/user";

import findIndex from "lodash/findIndex";
import orderBy from "lodash/sortBy";
import * as moment from "moment-timezone";
import { LoaderHelper } from "../../../helpers/loader-helper";
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

  errorMessages: any;

  disposisi: any = {
    personal: [],
    selaku: [],
    sifatSurat: "",
    catatan: "",
    tanggalSelesai: "",
    tanggalDisposisi: moment().format("DD-MM-YYYY"),
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

  profile: any = "";

  constructor(
    private disposisiProvider: NaskahDisposisiProvider,
    private toastHelper: ToastHelper,
    private momentHelper: MomentHelper,
    private datepickerProvider: DatepickerProvider,
    private navCtrl: NavController,
    private masterPegawai: MasterPegawaiProvider,
    private user: UserProvider,
    private loader: LoaderHelper
  ) {
    this.init();
    this.user.getProfile().subscribe(res => (this.profile = res));
  }

  init() {
    const petunjuk = this.disposisiProvider.getPetunjuk();
    const unitDisposisi = this.disposisiProvider.getUnitDisposisi();
    const sifatSurat = this.disposisiProvider.getSifatSurat();
    const pelaksana = this.disposisiProvider.getPelaksana();

    Observable.zip(petunjuk, unitDisposisi, sifatSurat, pelaksana).subscribe(
      ([petunjuk, unitDisposisi, sifatSurat, pelaksana]) => {
        this.datas.jabatan = unitDisposisi;
        this.datas.petunjuk = petunjuk;

        this.datas.pelaksana = pelaksana.response;

        // order by sifat by kode
        const sifat = sifatSurat.map(res => {
          return { keterangan: res.keterangan, kode: parseInt(res.kode) };
        });

        const mappingSifat = orderBy(sifat, ["keterangan"], ["asc"]);
        this.datas.sifatSurat = mappingSifat;

        // set default value sifat surat
        this.disposisi.sifatSurat = this.datas.sifatSurat[0].kode;
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
  selectUnit(unit: IDisposisiUnit, checked) {
    let unitIndex = this.disposisi.unitTujuan.indexOf(unit.kode_utuh);

    if (checked) {
      this.disposisi.unitTujuan.push({
        kode_utuh: unit.kode_utuh,
        uraian_jabatan: unit.uraian_jabatan
      });
    } else {
      this.disposisi.unitTujuan.splice(unitIndex, 1);
    }

    //untuk set default lead jika unit yg di select adalah 1
    if (this.disposisi.unitTujuan.length == 1) {
      this.disposisi.leader = this.disposisi.unitTujuan[0].kode_utuh;
    }
  }

  selectPelaksana(nip: string, checked: boolean) {
    let pelaksanaIndex = findIndex(this.disposisi.personal, nip);

    if (checked) {
      this.disposisi.personal.push(nip);
    } else {
      this.disposisi.personal.splice(pelaksanaIndex, 1);
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
    const indexPetunjuk = this.datas.petunjuk.indexOf(petunjuk);

    if (checked) {
      this.disposisi.petunjuk.push(petunjuk);
    } else {
      this.disposisi.petunjuk.splice(indexPetunjuk, 1);
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

  nextStep(to: any = "root") {
    setTimeout(() => {
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
    }, 100);

    // this.setDisposisiTarget(false);
  }

  setDisposisiTarget(status: boolean) {
    this.disposisiTarget.personal = status;
    this.disposisiTarget.unit = status;
  }

  back(to: string | any = "root") {
    setTimeout(() => {
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
    }, 100);
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
    this.loader.createLoader();
    this.disposisiProvider.simpanDisposisi(this.disposisi).subscribe(
      res => {
        this.message = res.message;
        this.navCtrl.pop();
        this.loader.dismiss();
        this.toastHelper.present(this.message);
      },
      err => {
        this.loader.dismiss();
        this.errorMessages = err;
        this.toastHelper.present("Terjadi Kesalahan");
      }
    );
  }
}
