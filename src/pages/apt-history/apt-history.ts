import { Component } from "@angular/core";
import { NavParams, NavController, IonicPage, Item } from "ionic-angular";
import { LogUtil } from "../../utils/logutil";

@Component({
  selector: "page-apt-history",
  templateUrl: "apt-history.html"
})
@IonicPage()
export class AptHistoryPage {

  static TAG:string = 'AptHistoryPage'
  static KEY_DATA:string = 'detail_data'

  TYPE_SUPERVISION:string = 'supervisions'
  TYPE_VERIFICATION:string = 'verifications'

  action: string;
  itemId: number;
  currentHistory:string = this.TYPE_SUPERVISION
  currentTextColor:string = 'dark-text'

  items:any = []

  apt:any = null

  histories:any = {
    supervisions: [

    ],
    verifications: [

    ]
  }

  tabs:any = [
    {
      name: 'Supervisi',
      isActive: true,
      icon: 'person',
      key: 'supervisions'
    },
    {
      name: 'Verifikasi',
      isActive: false,
      icon: 'checkbox',
      key: 'verifications'
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.apt = navParams.get(AptHistoryPage.KEY_DATA)
    LogUtil.d(AptHistoryPage.TAG, this.apt)
    if (this.apt) {
      if (this.apt.supervisi) {
        this.histories.supervisions.push(this.apt.supervisi)
      }
      if (this.apt.verifikasi && this.apt.verifikasi.length) {
        this.apt.verifikasi.forEach(item => {
          this.histories.verifications.push(item)
        })
      }
    }
  }

  ionViewDidLoad() {
    this.apt = this.navParams.get('apt')
    if (this.apt != null) {
      this.currentTextColor = this.getStatusColor(this.apt.status_norma);
    }
    this.onTabDefaultSelected()
  }

  isHistoryExist() {
    return this.histories.supervisions.length > 0 || this.histories.verifications.length > 0
  }

  private onTabDefaultSelected() {
    this.getContentByIndex(0)
  }

  onTabClick(position:number = 0) {
    this.tabs.forEach((item, i) => {
      item.isActive = i === position && !item.isActive
    })
    this.getContentByIndex(position)
  }

  getContentByIndex(index) {
    this.items = []
    this.currentHistory = this.tabs[index].key
    this.items = this.histories[this.currentHistory]
  }

  isSupervision() {
    return this.currentHistory === this.TYPE_SUPERVISION
  }

  isVerification() {
    return this.currentHistory === this.TYPE_VERIFICATION
  }

  getStatusColor(status:string = ''):string {
    switch(status) {
      case 'Permohonan Aktif':
        return 'new-green-text'
      case 'Permohonan aktif mendekati batas waktu':
        return 'new-orange-text'
      case 'Permohonan melebihi batas waktu':
        return 'new-red-text'
      default:
        return 'dark-text'
    }
  }

}
