import { Component } from "@angular/core";
import { NavParams, IonicPage } from "ionic-angular";

import { LoaderHelper } from "../../helpers/loader-helper";
import { NotificationProvider } from "../../providers/notification/notification";
import { LogUtil } from "../../utils/logutil";

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
    items: [],
    meta: {
      total: {
        all: {
          name: 'Semua Notifikasi',
          value: 0
        },
        notification_apt:  {
          name: 'APT',
          value: 0
        },
        notification_personal:  {
          name: 'Personal',
          value: 0
        },
        notification_persuratan:  {
          name: 'Persuratan',
          value: 0
        },
        notification_e_rapat:  {
          name: 'ERapat',
          value: 0
        }
      }
    }
  }

  constructor(private navParams: NavParams, private provider: NotificationProvider) {
    this.data.typeString = navParams.get(NotificationPage.KEY_TYPE)
  }

  ionViewWillEnter() {
    this.provider.getTotalNotication().subscribe(
      result => {
        if (result) {
          for (var i in result) {
            this.data.meta.total[i].value = result[i]
            this.data.meta.total.all.value += result[i]
          }
        }
      },
      error => {
        LogUtil.d(NotificationPage.TAG, error)
      }
    )

    const currentProvider = this.provider.switchProvider(this.data.typeString)
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

  doInfinite($event) {
    
  }

}
