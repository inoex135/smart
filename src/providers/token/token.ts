import { Injectable } from "@angular/core";
import { CacheProvider } from "../cache/cache";
import { LogUtil } from "../../utils/logutil";
import { ERROR_CODES } from "../../constant/error-codes";

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

  constructor(private cache: CacheProvider) {}

  getToken(): Promise<String> {
    return this.cache.get(this.KEY_CURRENT_TOKEN, false)
      .then(token => {
        this.latestToken = token as string
        return token
      })
  }

  getCurrentToken():Promise<string> {
    LogUtil.d(TokenProvider.TAG, "get current token")
    return this.cache.get(this.KEY_CURRENT_TOKEN, false)
  }

  setCurrentToken(token:string):Promise<any> {
    LogUtil.d(TokenProvider.TAG, "set current token")
    return this.cache.put(this.KEY_CURRENT_TOKEN, token, false)
  }

  setCurrentUserDataFirst() {
    LogUtil.d(TokenProvider.TAG, "set current token from logged in user data")
    return this.getLoggedInUser()
    .then(data => {
      if (data != null && data.token) {
        LogUtil.d(TokenProvider.TAG, data)
        return this.setCurrentToken(data.token)
        .then(() => {
          return this.setCurrentProfile(data.profile)
        })
        .then(() => {
          return data
        })
      }
      LogUtil.d(TokenProvider.TAG, 'data is null throw error')
      return Promise.reject(Error(ERROR_CODES.MISSING_TOKEN))
    })
  }

  setCurrentProfile(data:any) {
    LogUtil.d(TokenProvider.TAG, "set current profile")
    return this.cache.put(this.KEY_CURRENT_PROFILE, data, false)
  }

  getCurrentProfile() {
    return this.cache.get(this.KEY_CURRENT_PROFILE, false)
  }

  getUser(): Promise<Object> {
    return this.cache.get(this.KEY_LOGGIN_USER)
      .then(user => {
        this.latestUser = user;
        return user
      })
  }

  getLoggedInUser() {
    return this.cache.get(this.KEY_LOGGIN_USER, false)
  }

  getProfile(): Promise<any> {
    LogUtil.d(TokenProvider.TAG, "get profile from cache")
    return this.cache.getNoRecord(this.KEY_CURRENT_PROFILE)
      .then(profile => {
        this.latestProfile = profile
        return profile
      })
  }

  getProfilePltPlh() {
    return this.cache.getNoRecord(this.KEY_PL_TH)
      .then(res => {
        this.pltPlh = res
        return res
      })
  }

  saveToken(token: string): Promise<void> {
    this.latestToken = token;
    return this.cache.putNoRecord(this.KEY_CURRENT_TOKEN, token)
  }

  saveUser(user: any): Promise<any> {
    LogUtil.d(TokenProvider.TAG, "save user")
    this.latestUser = user;
    return this.cache.put(this.KEY_LOGGIN_USER, user, false)
  }

  saveProfile(profile: any): Promise<any> {
    LogUtil.d(TokenProvider.TAG, "save profile logged in user")
    this.latestProfile = profile;
    return Promise.all([this.cache.getNoRecord(this.KEY_LOGGIN_USER), this.cache.getNoRecord(this.KEY_PL_TH)])
      .then(([user, plt_plh]) => {
        LogUtil.d(TokenProvider.TAG, user)
        if (user && user['user'] && user['user']['name'] === profile.nip) {
          user['profile'] = profile
          this.saveUser(user)
          
        } else if (plt_plh && plt_plh['user'] && plt_plh['user']['name'] === profile.nip) {
          plt_plh['profile'] = profile
          this.saveTokenPltPlh(plt_plh)
        }
      })
      .then(() => {
        return this.cache.putNoRecord(this.KEY_CURRENT_PROFILE, profile)
      })
  }

  setPlthUser(data):Promise<any> {
    return this.cache.put(this.KEY_PL_TH, data, false)
    .then(() => {
      return this.setCurrentToken(data.token)
    })
    .then(() => {
      return Promise.resolve(data)
    })
  }

  saveTokenPltPlh(plt_plh):Promise<any> {
    LogUtil.d(TokenProvider.TAG, 'save plt token')
    return this.cache.put(this.KEY_PL_TH, plt_plh, false)
  }

  destroyToken() {
    this.latestToken = null;
    return this.cache.remove(this.KEY_CURRENT_TOKEN);
  }

  destroyProfile() {
    this.latestProfile = null;
    return this.cache.remove(this.KEY_CURRENT_PROFILE);
  }

  destroyUser() {
    this.latestUser = null;
    return this.cache.remove(this.KEY_LOGGIN_USER);
  }

  destroyPltPlh() {
    this.pltPlh = null;
    return this.cache.remove(this.KEY_PL_TH);
  }

  destroy() {
    this.destroyToken();
    this.destroyUser();
    this.destroyProfile();
    this.destroyPltPlh();
    this.cache.removeAll()
  }
}
