import { Component, Input, EventEmitter, Output } from "@angular/core";
import { HomeProvider } from "../../providers/home/home";
import { LogUtil } from "../../utils/logutil";
import { Flags } from "@ionic-native/file";

@Component({
  selector: "notification-bell",
  templateUrl: "notification-bell.html"
})
export class NotificationBell {

  static TAG:string = "NotificationBell"

  @Input() notificationType: string = "";

  totalNotification:number = 0

  isUpdating:boolean = false

  constructor(private homeProvider: HomeProvider) {
    this.updateNotification()
  }

  setTotalNotification(result:any) {
    if (result) {
      this.totalNotification = result.notification_apt + result.notification_personal + result.notification_persuratan
      LogUtil.d(NotificationBell.TAG, "count total notifications: " + this.totalNotification)
    }
  }

  updateNotification() {
    if (!this.isUpdating) {
      this.isUpdating = true
      LogUtil.d(NotificationBell.TAG, "updating notification...")
      this.homeProvider.getTotalNotication().subscribe(
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
    console.log("redirect to")
  }
  
}