import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { LogUtil } from "../../utils/logutil";
import { CacheProvider } from "../cache/cache";
import { TokenProvider } from "../token/token";

@Injectable()
export class HomeProvider {

  TAG:string = 'HomeProvider'
  private KEY_PHOTO = 'D4ryu8vEbJ9Tbbp'
  private KEY_DASHBOARD = '3NTsCdMyZVDwkfa_'

  constructor(private apiProvider: ApiProvider, 
    private cache: CacheProvider,
    private token: TokenProvider
  ) {}

  getPhotoProfile(): Promise<any> {
    LogUtil.d(this.TAG, 'get profile picture')
    return this.token.getCurrentProfile()
    .then(profile => {
      let key = this.KEY_PHOTO + "_" + profile.nip
      return Promise.all([this.cache.get(key), key])
    })
    .then(([result, key]) => {
      LogUtil.d(this.TAG, "get personal photo")
      if (result == null) {
        return this.apiProvider.getBlob("/personal/foto")
        .map(item => {
          if (item) {
            this.blobToBase64(item, base64 => this.saveToCache(key, base64))
          }
          return item
        }).toPromise()
      }
      return Promise.resolve(this.base64ToBlob(result))
    })
  }

  saveToCache(key, base64data) {
    var data = {}
    data['when'] = Date.now() + CacheProvider.FIVE_MINUTES
    data['response'] = base64data
    this.cache.put(key, data)
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

  getDashboard(): Promise<any> {
    LogUtil.d(this.TAG, "get dashboard")
    return this.token.getProfile()
    .then(profile => {
      LogUtil.d(this.TAG, profile)
      let key = this.KEY_DASHBOARD + profile.nip
      return Promise.all([this.cache.get(key), key])
    }).then(([result, key]) => {
      if (result == null) {
        return this.apiProvider.get("/personal/notification/dashboard")
        .map(item => {
          if (item) {
            this.cache.put(key, {when: Date.now() + CacheProvider.ONE_MINUTES, response: item})
          }
          return item
        })
        .toPromise()
      }
      return result.response
    })
  }

}
