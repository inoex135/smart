import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { LogUtil } from "../../utils/logutil";

@Injectable()
export class HomeProvider {

  TAG:string = 'HomeProvider'

  constructor(private apiProvider: ApiProvider) {}

  getPhotoProfile() {
    LogUtil.d(this.TAG, "get personal photo")
    return this.apiProvider.getBlob("/personal/foto");
  }

  getDashboard() {
    LogUtil.d(this.TAG, "get dashboard")
    return this.apiProvider.get("/personal/notification/dashboard")
  }

}
