import { Storage } from "@ionic/storage";
import { LogUtil } from "../../utils/logutil";
import { Injectable } from "@angular/core";

@Injectable()
export class CacheProvider {

    static TAG:string = 'CacheProvider'

    static ONE_MINUTES = (2 * 60 * 1000)
    static FIVE_MINUTES = (5 * 60 * 1000)
    private KEY_BANKS:string = 'key_banks'

    constructor(private storage: Storage) {}

    get(key:string):Promise<any> {
        return this.storage
        .ready()
        .then(() => this.storage.get(key) as Promise<any>)
        .then(result => {
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
        .then(() => this.storage.get(this.KEY_BANKS) as Promise<any>)
        .then(keys => {
            if (!keys) {
                keys = {}
            }
            keys[key] = Date.now()
            return this.storage.set(this.KEY_BANKS, keys)
        })
        .then(() => {
            this.storage.set(key, data)
        });
    }

    remove(key:string) {
        LogUtil.d(CacheProvider.TAG, "remove cache by key: " + key)
        return this.storage.remove(key)
    }

    removeAll() {
        LogUtil.d(CacheProvider.TAG, "remove all key in banks")
        return this.storage
        .ready()
        .then(() => this.storage.get(this.KEY_BANKS) as Promise<any>)
        .then(keys => {
            if (keys) {
                for (let i in keys) {
                    this.remove(i)
                }
            }
            return this.remove(this.KEY_BANKS)
        })
    }

    
}