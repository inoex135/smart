import { Storage } from "@ionic/storage";
import { LogUtil } from "../../utils/logutil";
import { Injectable } from "@angular/core";

@Injectable()
export class CacheProvider {

    static TAG:string = 'CacheProvider'

    static FIVE_MINUTES = (5 * 60 * 1000)

    constructor(private storage: Storage) {}

    get(key:string):Promise<any> {
        return this.storage
        .ready()
        .then(() => this.storage.get(key) as Promise<any>)
        .then(result => {
          LogUtil.d(CacheProvider.TAG, result)
          let now = Date.now()
          LogUtil.d(CacheProvider.TAG, "now: " + now)
          if (result && result.response && result.when > 0 && now < result.when) {
            LogUtil.d(CacheProvider.TAG, "key " + key + " exist")
            return Promise.resolve(result)
          }
    
          return Promise.resolve(null)
        })
      }
    
    put(key:string, data:any) {
    LogUtil.d(CacheProvider.TAG, "save to cache: " + key)
    return this.storage
        .ready()
        .then(() => this.storage.set(key, data) as Promise<void>);
    }

    remove(key:string) {
        LogUtil.d(CacheProvider.TAG, "remove cache by key: " + key)
        return this.storage.remove(key)
    }

    
}