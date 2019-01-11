import { Component, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { NaskahDisposisiProvider } from "../../../providers/naskah-disposisi/naskah-disposisi";
import { Observable } from "rxjs/Observable";
import { IDisposisiUnit } from "../../../interface/disposisi-unit";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ToastHelper } from "../../../helpers/toast-helper";
import { MomentHelper } from "../../../helpers/moment-helper";
import { DatepickerProvider } from "../../../providers/datepicker/datepicker";
import { NavController, AlertController } from "ionic-angular";

import orderBy from "lodash/sortBy";
import compact from "lodash/compact";
import * as moment from "moment-timezone";
import { LoaderHelper } from "../../../helpers/loader-helper";
import { AutoCompleteComponent } from "ionic2-auto-complete";
import { LogUtil } from "../../../utils/logutil";
import { MasterPegawaiProvider } from "../../../providers/master-pegawai/master-pegawai";
import { TokenProvider } from "../../../providers/token/token";

@Component({
  selector: "disposisi",
  templateUrl: "disposisi.html"
})
export class Disposisi {

  TAG:string = 'Disposisi'

  @Output() 
  onPageChanged = new EventEmitter<Object>()

  datas: any = {};
  Picker: string = new Date().toISOString();
  unit: Array<any> = [];
  selectedUnit: Array<any> = [];
  lead: Array<string> = [];
  message: string = "";

  pelaku: string;

  errorMessages: any;

  nextButtonDisabled:boolean = true;

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

  currentStep:number = 0

  arraySteps:any = [0, 1, 2]

  profile: any = {}

  //access ion-autocomplete func
  @ViewChild("searchbar") searchbar: AutoCompleteComponent;

  constructor(
    private disposisiProvider: NaskahDisposisiProvider,
    private toastHelper: ToastHelper,
    private momentHelper: MomentHelper,
    private datepickerProvider: DatepickerProvider,
    private masterPegawai: MasterPegawaiProvider,
    private navCtrl: NavController,
    private user: TokenProvider,
    private loader: LoaderHelper,
    private alert: AlertController
  ) {
    this.user.getProfile().then(res => {
      LogUtil.d(this.TAG, res)
      this.profile = res
      this.setEselon4Requirements()
    });
    this.init();
  }

  init() {

    const petunjuk = this.disposisiProvider.getPetunjuk();
    const unitDisposisi = this.disposisiProvider.getUnitDisposisi();
    const sifatSurat = this.disposisiProvider.getSifatSurat();
    const pelaksana = this.disposisiProvider.getPelaksana();

    Observable.zip(petunjuk, unitDisposisi, sifatSurat, pelaksana)
    .subscribe(
      ([petunjuk, unitDisposisi, sifatSurat, pelaksana]) => {
        this.datas.jabatan = this.mappingPelaksana(unitDisposisi)
        this.datas.petunjuk = this.mappingPetunjuk(petunjuk)

        this.datas.pelaksana = this.mappingPelaksana(pelaksana.response)

        // order by sifat by kode
        const sifat = sifatSurat.map(res => {
          return { keterangan: res.keterangan, kode: parseInt(res.kode) }
        })

        const mappingSifat = orderBy(sifat, ["keterangan"], ["asc"])
        this.datas.sifatSurat = mappingSifat

        // set default value sifat surat
        this.disposisi.sifatSurat = this.datas.sifatSurat[0].kode
      }
    )
  }

  // add isChecked untuk flagging ketika kembali ke halaman sebelumnya
  // langsung terceklist data pelaksana yg sudah di ceklist sebelumnya
  mappingPelaksana(pelaksana: any) {
    const data = pelaksana.map(element => {
      element['isChecked'] = false
      return element
    })

    return data
  }

  isEselon4():boolean {
    return this.profile.jenis_eselon == 4
  }

  mappingPetunjuk(petunjuk: any) {
    const data = petunjuk.map(res => {
      res.isChecked = false;
      return res;
    });

    return data;
  }

  selectDisposisi(target: string) {
    if (target === this.selectAs.unit) {
      this.disposisiTarget.unit = !this.disposisiTarget.unit;
    }

    if (target === this.selectAs.personal) {
      this.disposisiTarget.personal = !this.disposisiTarget.personal;
    }
  }

  isDisposisiChecked() {
    return this.disposisiTarget.unit || this.disposisiTarget.personal
  }

  setEselon4Requirements() {
    if (this.isEselon4()) {
      this.component.disposisiPersonal = true
      this.disposisiTarget.personal = true
    }
  }

  // CHECKBOX
  // untuk get dan remove value checkbox unit
  // remove by index dari unit yg di klik
  // dan add by index yang di klik
  selectUnit(unit: IDisposisiUnit, checked, index: number) {
    let unitIndex = this.disposisi.unitTujuan.indexOf(unit.kode_utuh)
    this.datas.jabatan[index].isChecked = checked
    if (checked) {
      this.disposisi.unitTujuan.push({
        kode_utuh: unit.kode_utuh,
        uraian_jabatan: unit.uraian_jabatan
      })
    } else {
      this.disposisi.unitTujuan.splice(unitIndex, 1)
    }

    //untuk set default lead jika unit yg di select adalah 1
    if (this.disposisi.unitTujuan.length == 1) {
      this.disposisi.leader = this.disposisi.unitTujuan[0].kode_utuh
    }
  }

  //checked/select pelaksana
  selectPelaksana(pelaksana: any, checked: boolean, index: number) {
    this.datas.pelaksana[index]['isChecked'] = checked
    if (checked) {
      this.disposisi.personal.push(pelaksana)
    } else {
      this.disposisi.personal.splice(this.getIndexByModel(pelaksana), 1)
    }
  }

  getIndexByModel(pelaksana: any): number {
    return this.disposisi.personal.forEach((element, i) => {
      if (element.nip == pelaksana.nip) {
        return i
      } else {
        return -1
      }
    })
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
  
  onChange(petunjuk: string, checked: boolean, index: number) {
    const indexPetunjuk = this.datas.petunjuk.indexOf(petunjuk);

    if (checked) {
      this.datas.petunjuk[index].isChecked = true;
      this.disposisi.petunjuk.push(petunjuk);
    } else {
      this.datas.petunjuk[index].isChecked = false;
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
  addDisposisiPersonalDanPersonal(selaku: Array<any>, item: any) {
    LogUtil.d(this.TAG, item)
    selaku.push(item);
    this.addPersonal();

    //clear searchbar dan selaku form
    this.pelaku = "";
    this.searchbar.clearValue();
  }

  addPersonal() {
    const personal = this.searchbar.getSelection();
    this.disposisi.personal.push(personal);
  }

  addData(data: Array<any>, item: any) {
    data.push(item);
  }

  removeData(data: Array<any>, index: number) {
    LogUtil.d(this.TAG, data)
    data.splice(index, 1);
    if (this.disposisi.personal) {
      this.disposisi.personal.splice(index, 1)
    }
    LogUtil.d(this.TAG, data)
  }

  next() {
    if (!this.disabledNextButton()) {
      this.toastHelper.present('Periksa kembali inputan anda!')
      return
    }
    if (this.currentStep < 0) {
      this.currentStep = 0
    }
    this.currentStep++
    if (this.currentStep > this.arraySteps.length) {
      this.currentStep = this.arraySteps.length - 1
    }
    this.nextStep(this.arraySteps[this.currentStep])
  }

  prev(): number {
    this.currentStep--
    if (this.currentStep < 0) {
      this.currentStep = 0
      return -1
    }
    return this.back('')
  }

  nextStep(to: any = "root") {
    setTimeout(() => {
      if (this.currentStep == 2) {
        this.component.disposisiPersonal = this.disposisiTarget.personal
        this.component.disposisiUnit = this.disposisiTarget.unit
        this.component.unitOrPersonal = this.disposisiTarget.unit && this.disposisiTarget.personal
      }
      this.emitPageChange()
    }, 100)

    // this.setDisposisiTarget(false);
  }

  setDisposisiTarget(status: boolean) {
    this.disposisiTarget.personal = status
    this.disposisiTarget.unit = status
  }

  private back(to: string | any = "root") {
    if (this.currentStep == this.arraySteps[0]) {
      this.component.unitOrPersonal = true
      this.component.disposisiUnit = false
      this.component.disposisiPersonal = false
      this.setEselon4Requirements()
    } else if (this.currentStep == this.arraySteps[2]) {
      this.component.disposisiPersonal = this.disposisiTarget.personal;
      this.component.disposisiUnit = this.disposisiTarget.unit
    }
    this.emitPageChange()
    return this.currentStep
  }

  emitPageChange() {
    this.onPageChanged.emit({step: this.currentStep, isLastPage: this.isLastStep()})
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
    //remove array value null, undefined, ""
    LogUtil.d(this.TAG, this.disposisi)
    this.disposisi.selaku = compact(this.disposisi.selaku);

    this.loader.show().then(isPresent => {
      LogUtil.d(this.TAG, this.disposisi)
      this.disposisiProvider.simpanDisposisi(this.disposisi).subscribe(
        res => {
          this.loader.dismissLoader()
          this.message = res.message
          this.closePageWithDelay()
        },
        err => {
          this.loader.dismissLoader()
          this.errorMessages = err
          this.toastHelper.presentError(err)
        }
      )
    })
  }

  closePageWithDelay() {
    LogUtil.d(this.TAG, "close page with delay 200")
    setTimeout(() => {
      this.navCtrl.pop()
      this.toastHelper.present(this.message)
    }, 200)
  }
    
  disabledNextButton() {
    if (this.currentStep == this.arraySteps[2]) {
      return this.isSifatSuratFilled()
    } else if (this.currentStep == this.arraySteps[0]) {
      if (this.isEselon4()) {
        return this.disposisi.personal.length > 0
      }
      return this.disposisi.unitTujuan.length > 0 || this.disposisi.selaku.length > 0
    } else if (this.currentStep == this.arraySteps[1]) {
      return this.disposisi.petunjuk.length > 0
    } else {
      return true
    }
  }

  isSifatSuratFilled() {
    return this.disposisi.sifatSurat !== ''
  }

  isLastStep() {
    return this.currentStep == (this.arraySteps.length - 1)
  }

  hidePrevButton() {
    return this.currentStep != 0
  }

  showDialogSave() {
    let alert = this.alert.create({
      title: 'Konfirmasi',
      message: 'Apakah anda yakin untuk menyimpan data disposisi?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            alert.dismiss()
            return false
          }
        },
        {
          text: 'Simpan',
          handler: () => {
            alert.dismiss().then(() => {
              this.simpan()
            })
            return false
          }
        }
      ]
    });
    alert.present();
  }

}
