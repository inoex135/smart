import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { LogUtil } from "../../utils/logutil";

@Injectable()
export class NotificationProvider {

    static TAG:string = 'NotificationProvider'

    static TYPE_ALL:string = 'all'
    static TYPE_APT:string = "notification_apt"
    static TYPE_PERSURATAN:string = "notification_persuratan"
    static TYPE_RAPAT:string = "notification_rapat"
    static TYPE_PERSONAL:string = "notification_personal"

    constructor(public api: ApiProvider) {}

    getTotalNotication() {
        LogUtil.d(NotificationProvider.TAG, "get total notification")
        return this.api.get("/personal/notification");
    }

    getAptNotification(type:string) {
        LogUtil.d(NotificationProvider.TAG, "get apt notification")
        return this.api.get("/personal/notification/apt").map(item => {
            item.type = type
        });
    }

    getPersuratanNotification(type:string) {
        LogUtil.d(NotificationProvider.TAG, "get persuratan notification")
        return this.api.get("/personal/notification/persuratan").map(item => {
            item.type = type
        });
    }

    getRapatNotification(type:string) {
        LogUtil.d(NotificationProvider.TAG, "get rapat notification")
        return this.api.get("/personal/notification/persuratan").map(item => {
            item.type = type
        });
    }

    getPersonalNotification(type:string) {
        LogUtil.d(NotificationProvider.TAG, "get personal notification")
        return this.api.get("/personal/notification/persuratan").map(item => {
            item.type = type
        });
    }

    getAllNotification(type:string) {
        LogUtil.d(NotificationProvider.TAG, "get all notification")
        return this.api.get("/personal/notification/persuratan").map(item => {
            item.type = type
        });
    }

    switchProvider(type:string = '') {
        let currentProvider = null;
        switch(type) {
          case NotificationProvider.TYPE_APT:
            currentProvider = this.getAptNotification(type)
            break
          case NotificationProvider.TYPE_PERSURATAN:
            currentProvider = this.getPersuratanNotification(type)
            break
          case NotificationProvider.TYPE_RAPAT:
            currentProvider = this.getRapatNotification(type)
            break
          case NotificationProvider.TYPE_PERSONAL:
            currentProvider = this.getPersonalNotification(type)
            break
          default:
            currentProvider = this.getAllNotification(type)
            break
        }
        return currentProvider
    }

}
