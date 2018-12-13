import { Component } from "@angular/core";
import { NavParams, IonicPage, NavController } from "ionic-angular";

import { LoaderHelper } from "../../helpers/loader-helper";
import { NotificationProvider } from "../../providers/notification/notification";
import { LogUtil } from "../../utils/logutil";
import { AptDetailPage } from "../apt-detail/apt-detail";
import { NaskahMasukDetailPage } from "../naskah-masuk-detail/naskah-masuk-detail";
import { MeetingDetailPage } from "../meeting-detail/meeting-detail";
import { PersonalAgendaDetailPage } from "../personal-agenda-detail/personal-agenda-detail";
import { MeetingDetailAgendaPage } from "../meeting-agenda/meeting-detail-agenda";

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
        currentPage: 1,
        totalPages: 0,
        isRead: 0
      }
    }
  }

  constructor(
    private navParams: NavParams, 
    private navCtrl: NavController,
    private provider: NotificationProvider,
    private loaderHelper: LoaderHelper) {
    this.initChips()
    this.data.typeString = this.navParams.get(NotificationPage.KEY_TYPE)
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
    },
    data[NotificationProvider.TYPE_RAPAT] = {
      name: 'E-Rapat',
      value: 0,
      active: false
    },
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
    this.data.meta.chips = {}
    this.data.meta.chips = data
  }

  ionViewWillEnter() {
    this.getTotalNotification()
    if (this.data.items.length == 0) {
      this.fillList()
    }
  }

  ionViewWillLeave() {
    LogUtil.d(NotificationPage.TAG, "view did disappear")
    this.loaderHelper.notPresents()
  }

  getTotalNotification() {
    LogUtil.d(NotificationPage.TAG, this.data.meta.chips)
    this.provider.getTotalNotication().subscribe(
      result => {
        if (result && this.showChips()) {
          LogUtil.d(NotificationPage.TAG, result)
          for (var i in result) {
            LogUtil.d(NotificationPage.TAG, "get element by key: " + i)
            if (this.data.meta.chips[i]) {
              this.data.meta.chips[i].value = result[i]
            }
          }
        }
      },
      error => {
        LogUtil.d(NotificationPage.TAG, error)
      }
    )
  }

  fillList():void {
    this.loaderHelper.show()
    .then(isPresent => {
      const currentProvider = this.provider.switchProvider(this.data)
      if (currentProvider !== null) {
        currentProvider.subscribe(
          res => {
            this.updateMetaPage(res)
            if (res) {
              this.data.items = res.content
            }
            this.loaderHelper.dismissLoader()
          },
          error => {
            this.loaderHelper.dismissLoader()
            LogUtil.d(NotificationPage.TAG, error)
          }
        )
      }
    })
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

  showChips():boolean {
    return this.data.typeString === NotificationProvider.TYPE_ALL
  }

  increaseCurrentPage():void {
    this.data.meta.page.currentPage += 1
  }

  decreaseCurrentPage():void {
    if (this.data.meta.page.currentPage == 1) {
      return
    }
    this.data.meta.page.currentPage -= 1
  } 

  isAllowedInfinite():boolean {
    return this.data.meta.page.totalPages == this.data.meta.page.currentPage
  }

  updateMetaPage(res:any):void {
    this.data.meta.page.total += res.size
    if (res.totalPages) {
      this.data.meta.page.totalPages = res.totalPages
    }
  }

  doInfinite(event) {
    if (this.isAllowedInfinite()) {
      event.complete()
      return
    }
    this.increaseCurrentPage()
    setTimeout(() => {
      const resourceData = this.provider.switchProvider(this.data);
      resourceData.subscribe(
        res => {
          this.updateMetaPage(res)
          if (res.content.length > 0) {
            res.content.forEach(element => {
              this.data.items.push(element)
            });
          } else {
            this.decreaseCurrentPage()
          }
        },
        err => {
          this.decreaseCurrentPage()
          LogUtil.d(NotificationPage.TAG, err)
        }
      );
      event.complete()
    }, 500)
  }

  clickChip(key:string = '') {
    LogUtil.d(NotificationPage.TAG, 'key: 0' + key)
    for (var i in this.data.meta.chips) {
      var current = this.data.meta.chips[i]
      current.active = current.key === key
    }
    this.setProvider(key)
    this.clearItems()
    this.fillList()
  }

  setProvider(key:string = '') {
    this.data.provider = key !== '' ? key : this.data.typeString
    LogUtil.d(NotificationPage.TAG, "provider: " + this.data.provider)
  }

  clearItems():void {
    this.data.items = []
    this.data.meta.page = {
      total: 0,
      currentPage: 1,
      totalPages: 0,
      isRead: 0
    }
  }

  onItemClick(model:any) {
    LogUtil.d(NotificationPage.TAG, model)
    var data = {}
    switch (model.type) {
      case NotificationProvider.TYPE_APT:
        this.navCtrl.push(AptDetailPage.TAG, { itemId: model.id })
        break
      case NotificationProvider.TYPE_PERSURATAN:
        this.navCtrl.push(NaskahMasukDetailPage.TAG, { naskahId: model.id })
        break
      case NotificationProvider.TYPE_RAPAT:
        data[MeetingDetailAgendaPage.KEY_AGENDA_ID] = model.id
        data[MeetingDetailAgendaPage.KEY_TIME_ID] = model.model_id
        this.navCtrl.push(MeetingDetailPage.TAG, data)
        break
      case NotificationProvider.TYPE_PERSONAL:
        data[PersonalAgendaDetailPage.KEY_AGENDA_ID] = model.id
        data[PersonalAgendaDetailPage.KEY_MODEL] = model
        this.navCtrl.push(PersonalAgendaDetailPage.TAG, data)
        break
    }
  }

  doRefresh(refresher) {
    this.clearItems()
    this.provider.switchProvider(this.data).subscribe(
      res => {
        this.data.items = res.content
        refresher.complete()
      },
      err => { 
        this.loaderHelper.dismiss()
        refresher.complete();
       }
    );
  }

  getNotifications():Array<any> {
    return this.data.items
  }

  isNotificationExist():boolean {
    return this.getNotifications().length > 0
  }

}
