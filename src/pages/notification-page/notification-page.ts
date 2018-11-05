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
        all: 0,
        notification_apt: 0,
        notification_personal: 0,
        notification_persuratan: 0,
        notification_e_rapat: 0
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
          this.data.meta.total.all = 0
          for (var i in result) {
            this.data.meta.total[i] = result[i]
            this.data.meta.total.all += result[i]
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

}
