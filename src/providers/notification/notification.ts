import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { LogUtil } from "../../utils/logutil";

@Injectable()
export class NotificationProvider {

    static TAG:string = 'NotificationProvider'

    static TYPE_ALL:string = 'notification_all'
    static TYPE_APT:string = "notification_apt"
    static TYPE_PERSURATAN:string = "notification_persuratan"
    static TYPE_RAPAT:string = "notification_rapat"
    static TYPE_PERSONAL:string = "notification_personal"

    constructor(public api: ApiProvider) {}

    getTotalNotication() {
        LogUtil.d(NotificationProvider.TAG, "get total notification")
        return this.api.get("/personal/notification");
    }

    getAptNotification(data:any) {
        LogUtil.d(NotificationProvider.TAG, "get apt notification")
        return this.api.get("/personal/notification/apt" + this.getQueryString(data))
    }

    getPersuratanNotification(data:any) {
        LogUtil.d(NotificationProvider.TAG, "get persuratan notification")
        return this.api.get("/personal/notification/persuratan" + this.getQueryString(data))
    }

    getRapatNotification(data:any) {
        LogUtil.d(NotificationProvider.TAG, "get rapat notification")
        return this.api.get("/personal/notification/rapat" + this.getQueryString(data))
    }

    getPersonalNotification(data:any) {
        LogUtil.d(NotificationProvider.TAG, "get personal notification")
        return this.api.get("/personal/notification/personal" + this.getQueryString(data))
    }

    getAllNotification(data:any) {
        LogUtil.d(NotificationProvider.TAG, "get all notification")
        return this.api.get("/personal/notification/all" + this.getQueryString(data))
    }

    getQueryString(data:any):string {
        let queryString = "?page=" + data.currentPage
        if (data.isRead < 2) {
            queryString += "&is_read=" + data.isRead
        }
        return queryString
    }

    switchProvider(data:any) {
        let currentProvider = null;
        let metaPage = data.meta.page
        LogUtil.d(NotificationProvider.TAG, metaPage)
        switch(data.provider) {
          case NotificationProvider.TYPE_APT:
            currentProvider = this.getAptNotification(metaPage)
            break
          case NotificationProvider.TYPE_PERSURATAN:
            currentProvider = this.getPersuratanNotification(metaPage)
            break
          case NotificationProvider.TYPE_RAPAT:
            currentProvider = this.getRapatNotification(metaPage)
            break
          case NotificationProvider.TYPE_PERSONAL:
            currentProvider = this.getPersonalNotification(metaPage)
            break
          default:
            currentProvider = this.getAllNotification(metaPage)
            break
        }
        return currentProvider.map(item => {
            if (item.content) {
                item.content.forEach(element => {
                    if (data.provider != NotificationProvider.TYPE_ALL) {
                        element.type = data.provider
                    } else if (element.type == 1) {
                        element.type = NotificationProvider.TYPE_PERSONAL
                    } else if (element.type == 2) {
                        element.type = NotificationProvider.TYPE_PERSURATAN
                    } else if (item.type == 3) {
                        element.type = NotificationProvider.TYPE_APT
                    } else if (item.type == 4) {
                        element.type = NotificationProvider.TYPE_RAPAT
                    } 
                })
            }
            LogUtil.d(NotificationProvider.TAG, item)
            return item
        })
    }

    public readMeeting(modelId: any) {
        return this.read(modelId, '4')
    }

    public readPersonalAgenda(modelId: any) {
        return this.read(modelId, '1')
    }

    public read(modelId, type:string) {
        LogUtil.d(NotificationProvider.TAG, "read notification: " + type)
        let formData = new FormData();
        formData.append("idList", modelId);
        formData.append("tipe", type);
    
        return this.api.postForm("/personal/notification/read/", formData); 
    }

}
