import { Component, Input } from "@angular/core";
import { LogUtil } from "../../utils/logutil";
import { NavController } from "ionic-angular";
import { NotificationPage } from "../../pages/notification-page/notification-page";
import { NotificationProvider } from "../../providers/notification/notification";

@Component({
  selector: "notification-bell",
  templateUrl: "notification-bell.html"
})
export class NotificationBell {

  static TAG:string = "NotificationBell"

  @Input() notificationType:string = '';

  totalNotification:number = 0

  isUpdating:boolean = false

  constructor(private navCtrl: NavController, private provider: NotificationProvider) {
    this.updateNotification()
  }

  setTotalNotification(result:any) {
    if (result) {
      this.totalNotification = 0
      for (var i in result) {
        this.totalNotification += result[i]
      }
      LogUtil.d(NotificationBell.TAG, "count total notifications: " + this.totalNotification)
    }
  }

  updateNotification() {
    if (!this.isUpdating) {
      this.isUpdating = true
      LogUtil.d(NotificationBell.TAG, "updating notification...")
      this.provider.getTotalNotication().subscribe(
        res => {
          this.setTotalNotification(res)
          this.isUpdating = false
        },
        error => {
          this.isUpdating = false
          LogUtil.d(NotificationBell.TAG, "error")
        }
      )
    } else {
      LogUtil.d(NotificationBell.TAG, "already in updating state..")
    }
  }

  isNotificationExist():boolean {
    return this.totalNotification > 0
  }

  redirectTo() {
    LogUtil.d(NotificationBell.TAG, "redirect to: " + this.notificationType)
    NotificationPage.KEY_TYPE
    var data = {}
    data[NotificationPage.KEY_TYPE] = this.notificationType
    this.navCtrl.push(NotificationPage.TAG, data)
  }
  
}
