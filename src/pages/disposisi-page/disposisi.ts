import { Component, Input, ViewChild, Output, EventEmitter } from "@angular/core";

import { NavController, AlertController, IonicPage, NavParams, Platform } from "ionic-angular";

import orderBy from "lodash/sortBy";
import compact from "lodash/compact";
import * as moment from "moment-timezone";
import { AutoCompleteComponent } from "ionic2-auto-complete";
import { NaskahDisposisiProvider } from "../../providers/naskah-disposisi/naskah-disposisi";
import { ToastHelper } from "../../helpers/toast-helper";
import { MomentHelper } from "../../helpers/moment-helper";
import { DatepickerProvider } from "../../providers/datepicker/datepicker";
import { MasterPegawaiProvider } from "../../providers/master-pegawai/master-pegawai";
import { TokenProvider } from "../../providers/token/token";
import { LoaderHelper } from "../../helpers/loader-helper";
import { LogUtil } from "../../utils/logutil";
import { Observable } from "rxjs";
import { IDisposisiUnit } from "../../interface/disposisi-unit";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@IonicPage()
@Component({
  selector: "page-disposisi",
  templateUrl: "disposisi.html"
})
export class DisposisiPage {

  static TAG:string = 'DisposisiPage'

  @Output() 
  onPageChanged = new EventEmitter<Object>()

  datas: any = {
      pelaksana: []
  };
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
  }

  petunjuk: Array<any> = []
  selectedPetunjuk: any

  disposisiAs: string = "";
  naskahId: any;
  sumasId: any;
  private unRegisterBackButtonAction: Function

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

  arraySteps:any = [0, 1]

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
    private alert: AlertController,
    private navParams: NavParams,
    private platform: Platform
  ) {
    this.registerAction()

      this.naskahId = this.navParams.get('naskahId')
      LogUtil.d(DisposisiPage.TAG, 'naskahId: ' + this.naskahId)
    this.user.getProfile().then(res => {
      LogUtil.d(DisposisiPage.TAG, res)
      this.profile = res
      this.setEselon4Requirements()
    });
    this.init()

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
      element['selaku'] = ''
      element['fromSearch'] = false
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
    selectPelaksana(pelaksana: any, checked: boolean) {
        LogUtil.d(DisposisiPage.TAG, pelaksana)
        LogUtil.d(DisposisiPage.TAG, 'select pelaksana')
        let indexPelaksana = this.getIndexPelaksana(pelaksana)
        LogUtil.d(DisposisiPage.TAG, 'found index at: ' + indexPelaksana)
        let model = this.datas.pelaksana[indexPelaksana]
        model.isChecked = checked
        if (checked) {
            this.disposisi.personal.push(pelaksana)
        } else {
            let index = this.getPersonalIndexByModel(pelaksana)
            LogUtil.d(DisposisiPage.TAG, 'disposisi index found at: ' + index)
            model.selaku = ''
            this.disposisi.personal.splice(index, 1)
        }
    }

    getIndexPelaksana(pelaksana): number {
        for (let i = 0; i < this.datas.pelaksana.length; i++) {
            if (this.datas.pelaksana[i].nip === pelaksana.nip) {
                return i
            }
        }
        return -1
    }

    getPersonalIndexByModel(pelaksana: any): number {
        for (let i = 0; i < this.disposisi.personal.length; i++) {
            if (this.disposisi.personal[i].nip == pelaksana.nip) {
                return i
            }
        }
        return -1
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
  addDisposisiPersonalDanPersonal(item: any) {
    LogUtil.d(DisposisiPage.TAG, item)
    let personal = this.searchbar.getSelection()
    personal['selaku'] = item
    personal['fromSearch'] = true
    this.disposisi.personal.push(personal)
    //clear searchbar dan selaku form
    this.pelaku = ""
    this.searchbar.clearValue()
  }

  addData(data: Array<any>, item: any) {
    data.push(item);
  }

  removeData(personal) {
    LogUtil.d(DisposisiPage.TAG, personal)
    let index = this.getPersonalIndexByModel(personal)
    LogUtil.d(DisposisiPage.TAG, 'found index at: ' + index)
    this.disposisi.personal.splice(index, 1)
  }

    next() {
        LogUtil.d(DisposisiPage.TAG, this.disposisi)   
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

  petunjukChange() {
    LogUtil.d(DisposisiPage.TAG, this.selectedPetunjuk)
    this.disposisi.petunjuk = []
    this.selectedPetunjuk.forEach(element => {
      this.disposisi.petunjuk.push(element.id)
    })
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
    LogUtil.d(DisposisiPage.TAG, this.disposisi)
    this.disposisi.selaku = compact(this.disposisi.selaku);

    this.loader.show().then(isPresent => {
      LogUtil.d(DisposisiPage.TAG, this.disposisi)
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
    LogUtil.d(DisposisiPage.TAG, "close page with delay 200")
    setTimeout(() => {
      this.navCtrl.pop()
      this.toastHelper.present(this.message)
    }, 200)
  }
    
  disabledNextButton() {
    if (this.currentStep == this.arraySteps[0]) {
      if (this.isEselon4()) {
        return this.disposisi.personal.length > 0
      }
      return this.disposisi.unitTujuan.length > 0 || this.disposisi.selaku.length > 0
    } else if (this.currentStep == this.arraySteps[1]) {
      return this.disposisi.petunjuk.length > 0 && this.isSifatSuratFilled()
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
    if (!this.disabledNextButton()) {
      this.toastHelper.present('Periksa kembali inputan anda!')
      return
    }
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

  
/* https://forum.ionicframework.com/t/an-android-register-back-button-action-sample/130058 */
registerAction(): void {
    this.unRegisterBackButtonAction = this.platform.registerBackButtonAction(() => { 
      LogUtil.d(DisposisiPage.TAG, "back button clicked")
      if (this.prev() == -1) {
        this.navCtrl.pop()
      }
      return
    })
   }
   
   unRegister() {
     this.unRegisterBackButtonAction && this.unRegisterBackButtonAction()
   }

  ionViewWillLeave() {
    this.unRegister()
  }

  getDisposisiPersonalForSearch(): Array<any> {
      return this.disposisi.personal.filter(item => item.fromSearch)
  }


}
