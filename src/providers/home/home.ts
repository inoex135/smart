import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { LogUtil } from "../../utils/logutil";
import { CacheProvider } from "../cache/cache";

@Injectable()
export class HomeProvider {

  TAG:string = 'HomeProvider'
  static KEY_PHOTO = 'photo_profile'

  constructor(private apiProvider: ApiProvider, private cache: CacheProvider) {}

  getPhotoProfile() {
    LogUtil.d(this.TAG, "get personal photo")
    return this.cache.get(HomeProvider.KEY_PHOTO)
    .then(result => {
      if (result == null) {
        return this.apiProvider.getBlob("/personal/foto")
        .map(item => {
          if (item) {
            this.blobToBase64(item, base64 => this.saveToCache(base64))
          }
          return item
        }).toPromise()
      }
      return Promise.resolve(this.base64ToBlob(result))
    })
  }

  saveToCache(base64data) {
    var data = {}
    data['when'] = Date.now() + CacheProvider.FIVE_MINUTES
    data['response'] = base64data
    this.cache.put(HomeProvider.KEY_PHOTO, data)
  }

  // https://stackoverflow.com/a/18650249
  blobToBase64(response, callback) {
    var reader = new FileReader()
    reader.readAsDataURL(response)
    reader.onloadend = function() {
      callback(reader.result)
    }
  }

  // https://stackoverflow.com/a/27980815
  base64ToBlob(result) {
    var byteString = atob(result.response.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" })
  }

  removePhotoCache() {
    this.cache.remove(HomeProvider.KEY_PHOTO)
  }

  getDashboard() {
    LogUtil.d(this.TAG, "get dashboard")
    return this.apiProvider.get("/personal/notification/dashboard")
  }

}
