import { Component, Input } from "@angular/core";
import { App } from "ionic-angular";
import { HomeProvider } from "../../providers/home/home";
import { LogUtil } from "../../utils/logutil";

@Component({
  selector: "notification-bell",
  templateUrl: "notification-bell.html"
})
export class NotificationBell {

  static TAG:string = "NotificationBell"

  constructor(private app: App, private homeProvider: HomeProvider) {}

  @Input() notificationType: string = "";

  totalNotification:number = 0

  ionViewWillEnter() {
    LogUtil.d(NotificationBell.TAG, "view enter")
    this.homeProvider.getTotalNotication().subscribe(
      result => {
        if (result) {
          this.totalNotification = result.notification_apt + result.notification_personal + result.notification_persuratan
          LogUtil.d(NotificationBell.TAG, "count total notifications: " + this.totalNotification)
        }
      },
      error => {
        LogUtil.d(NotificationBell.TAG, "error")
      }
    )
  }

  isNotificationExist():boolean {
    return this.totalNotification > 0
  }
  
}
