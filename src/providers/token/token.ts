import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { CacheProvider } from "../cache/cache";
import { LogUtil } from "../../utils/logutil";

@Injectable()
export class TokenProvider {

  static TAG:string = 'TokenProvider'

  public latestToken: string;
  public latestUser: any;
  public latestProfile: any;
  public pltPlh: any;

  private KEY_CURRENT_TOKEN:string = 'injjhhwPUU33mv6'
  private KEY_LOGGIN_USER:string = 'xFX9Hz14OjwpAEh'
  private KEY_PL_TH:string = 'GNpyCTlgr7BPWbo'
  private KEY_CURRENT_PROFILE:string = 'Q3fX8IsMeCip0x8'

  constructor(public storage: Storage, private cache: CacheProvider) {}

  getToken(): Promise<String> {
    return this.storage
      .ready()
      .then(() => this.storage.get(this.KEY_CURRENT_TOKEN) as Promise<string>)
      .then(token => {
        this.latestToken = token;
        return token;
      });
  }

  getCurrentToken():Promise<string> {
    LogUtil.d(TokenProvider.TAG, "get current token")
    return this.cache.get(this.KEY_CURRENT_TOKEN, false)
  }

  setCurrentToken(token:string):Promise<any> {
    LogUtil.d(TokenProvider.TAG, "set current token")
    return this.cache.put(this.KEY_CURRENT_TOKEN, token, false)
  }

  getUser(): Promise<Object> {
    return this.storage
      .ready()
      .then(() => this.storage.get(this.KEY_LOGGIN_USER) as Promise<Object>)
      .then(user => {
        this.latestUser = user;
        return user;
      });
  }

  getProfile(): Promise<any> {
    LogUtil.d(TokenProvider.TAG, "get profile from cache")
    return this.storage
      .ready()
      .then(() => this.storage.get(this.KEY_CURRENT_PROFILE) as Promise<any>)
      .then(profile => {
        this.latestProfile = profile;
        return profile;
      });
  }

  getProfilePltPlh() {
    return this.storage
      .ready()
      .then(() => {
        this.storage.get(this.KEY_PL_TH) as Promise<Object>;
      })
      .then(res => {
        this.pltPlh = res;
        return res;
      });
  }

  revertTokenToOriginalUser() {
    return this.storage.get(this.KEY_CURRENT_TOKEN)
    .then(res => {
      this.latestToken = res
      return Promise.resolve(this.latestToken)
    })
  }

  saveToken(token: string): Promise<void> {
    this.latestToken = token;
    return this.storage
      .ready()
      .then(() => this.storage.set(this.KEY_CURRENT_TOKEN, token) as Promise<void>);
  }

  saveUser(user: any): Promise<any> {
    LogUtil.d(TokenProvider.TAG, "save user")
    this.latestUser = user;
    return this.cache.put(this.KEY_LOGGIN_USER, user, false)
  }

  saveProfile(profile: any): Promise<any> {
    LogUtil.d(TokenProvider.TAG, "save profile logged in user")
    this.latestProfile = profile;
    return this.storage
      .ready()
      .then(() => Promise.all([this.storage.get(this.KEY_LOGGIN_USER), this.storage.get(this.KEY_PL_TH)]))
      .then(([user, plt_plh]) => {
        LogUtil.d(TokenProvider.TAG, user)
        if (user['name'] === profile.nip) {
          user['profile'] = profile
          this.saveUser(user)
        } else if (plt_plh && plt_plh['user'] && plt_plh['user']['name'] === profile.nip) {
          plt_plh['profile'] = profile
          this.saveTokenPltPlh(plt_plh)
        }
      })
      .then(() => {this.storage.set(this.KEY_CURRENT_PROFILE, profile)})
  }

  saveTokenPltPlh(plt_plh):Promise<any> {
    LogUtil.d(TokenProvider.TAG, 'save plt token')
    return this.cache.put(this.KEY_PL_TH, plt_plh, false)
  }

  destroyToken() {
    this.latestToken = null;
    return this.storage.remove(this.KEY_CURRENT_TOKEN);
  }

  destroyProfile() {
    this.latestProfile = null;
    return this.storage.remove(this.KEY_CURRENT_PROFILE);
  }

  destroyUser() {
    this.latestUser = null;
    return this.storage.remove(this.KEY_LOGGIN_USER);
  }

  destroyPltPlh() {
    this.pltPlh = null;
    return this.storage.remove(this.KEY_PL_TH);
  }

  destroy() {
    this.destroyToken();
    this.destroyUser();
    this.destroyProfile();
    this.destroyPltPlh();
    this.cache.removeAll()
  }
}
