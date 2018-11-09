import { Component } from "@angular/core";
import { NavParams, IonicPage, NavController } from "ionic-angular";

import { LoaderHelper } from "../../helpers/loader-helper";
import { NotificationProvider } from "../../providers/notification/notification";
import { LogUtil } from "../../utils/logutil";
import { AptDetailPage } from "../apt-detail/apt-detail";
import { NaskahMasukDetailPage } from "../naskah-masuk-detail/naskah-masuk-detail";

@Component({
  selector: "notification-page",
  templateUrl: "notification-page.html"
})
@IonicPage()
export class NotificationPage {

  static TAG:string = 'NotificationPage'

  static KEY_TYPE:string = "type";

  data:any = {
    typeString: '',
    provider: NotificationProvider.TYPE_ALL,
    items: [],
    meta: {
      chips: {},
      page: {
        total: 0,
        currentPage: 0
      }
    }
  }

  constructor(
    private navParams: NavParams, 
    private navCtrl: NavController,
    private provider: NotificationProvider) {
    this.initChips()
    this.data.typeString = navParams.get(NotificationPage.KEY_TYPE)
    if (this.data.typeString === '') {
      LogUtil.d(NotificationPage.TAG, "set default type string to " + NotificationProvider.TYPE_ALL)
      this.data.typeString = NotificationProvider.TYPE_ALL
    }
    LogUtil.d(NotificationPage.TAG, this.data.typeString)
    this.setProvider()
  }

  initChips() {
    var data:any ={}
    data[NotificationProvider.TYPE_ALL] = {
      name: 'Semua Notifikasi',
      value: 0,
      active: true
    }
    data[NotificationProvider.TYPE_APT] = {
      name: 'APT',
      value: 0,
      active: false
    }
    data[NotificationProvider.TYPE_PERSONAL] = {
      name: 'Personal',
      value: 0,
      active: false
    }
    data[NotificationProvider.TYPE_PERSURATAN] = {
      name: 'Persuratan',
      value: 0,
      active: false
    }
    data[NotificationProvider.TYPE_RAPAT] = {
      name: 'E-Rapat',
      value: 0,
      active: false
    }
    this.data.meta.chips = data
  }

  ionViewWillEnter() {
    this.provider.getTotalNotication().subscribe(
      result => {
        if (result && this.showChips()) {
          for (var i in result) {
            this.data.meta.chips[i].value = result[i]
            this.data.meta.chips.all.value += result[i]
          }
        }
      },
      error => {
        LogUtil.d(NotificationPage.TAG, error)
      }
    )
    this.fillList()
  }

  fillList() {
    const currentProvider = this.provider.switchProvider(this.data.provider)
    if (currentProvider !== null) {
      currentProvider.subscribe(
        result => {
          if (result) {
            this.data.items = result
          }
        },
        error => {
          LogUtil.d(NotificationPage.TAG, error)
        }
      )
    }
  }

  getChips() {
    var data = []
    if (this.showChips()) {
      var k = 0
      for (var a in this.data.meta.chips) {
        data[k] = this.data.meta.chips[a]
        data[k].key = a
        k++
      }
    }
    return data
  }

  showChips() {
    return this.data.typeString === NotificationProvider.TYPE_ALL
  }

  increaseCurrentPage() {
    this.data.meta.currentPage += 1;
  }

  decreaseCurrentPage() {
    if (this.data.meta.currentPage == 1) {
      return
    }
    this.data.meta.currentPage -= 1;
  } 

  doInfinite(event) {
    this.increaseCurrentPage()
    setTimeout(() => {
      const resourceData = this.provider.switchProvider(this.data.provider);
      resourceData.subscribe(
        res => {
          if (res.length == 0) {
            this.decreaseCurrentPage()
          }
          for (var index = 0; index < res.length; index++) {
            this.data.items.push(res[index]);
          }
        },
        err => {
          LogUtil.d(NotificationPage.TAG, err)
        }
      );
      event.complete();
    }, 1000);
  }

  clickChip(key:string = '') {
    LogUtil.d(NotificationPage.TAG, 'key: 0' + key)
    for (var i in this.data.meta.chips) {
      var current = this.data.meta.chips[i]
      current.active = current.key === key && !current.active
    }
    this.setProvider(key)
    this.clearItems()
    this.fillList()
  }

  setProvider(key:string = '') {
    this.data.provider = key !== '' ? key : this.data.typeString
    LogUtil.d(NotificationPage.TAG, "provider: " + this.data.provider)
  }

  clearItems() {
    this.data.items = []
    this.data.meta.page = {
      total: 0,
      currentPage: 1
    }
  }

  onItemClick(model:any) {
    switch (model.type) {
      case NotificationProvider.TYPE_APT:
        this.navCtrl.push(AptDetailPage.TAG, { itemId: model.id })
        break
      case NotificationProvider.TYPE_PERSURATAN:
        this.navCtrl.push(NaskahMasukDetailPage.TAG, { naskahId: model.id })
        break
      case NotificationProvider.TYPE_RAPAT:

        break
    }
  }

}
