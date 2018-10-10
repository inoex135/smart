import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { LogUtil } from "../../utils/logutil";

@Injectable()
export class HomeProvider {

  TAG:string = 'HomeProvider'

  constructor(private apiProvider: ApiProvider) {}

  getTotalNotication() {
    LogUtil.d(this.TAG, "get total notification")
    return this.apiProvider.get("/personal/notification");
  }

  getPhotoProfile() {
    LogUtil.d(this.TAG, "get personal photo")
    return this.apiProvider.getBlob("/personal/foto");
  }

}
