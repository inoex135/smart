import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs/ReplaySubject";

import { ApiProvider } from "../api/api";
import { TokenProvider } from "../token/token";

import { User } from "../../models/users";
import { map } from "rxjs/operators/map";
import { LogUtil } from "../../utils/logutil";

@Injectable()
export class UserProvider {

  TAG:string = 'UserProvider'

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    public apiProvider: ApiProvider,
    public tokenProvider: TokenProvider
  ) {}

  // verify token yang ada di storage
  // populate() {
  //   this.tokenProvider.getToken().then(token => {
  //     // if token available/verify, set user info
  //     if (token) {
  //       this.apiProvider
  //         .get("/user")
  //         .subscribe(data => this.setAuth(data.user), err => this.purgeAuth);
  //     } else {
  //       this.purgeAuth();
  //     }
  //   });
  // }

  setAuth(data: any) {
    this.tokenProvider.saveToken(data.token);
    this.tokenProvider.saveUser(data.user);
    // this.isAuthenticatedSubject.next(true);
  }

  setProfile(data: any) {
    this.tokenProvider.saveProfile(data);
  }

  purgeAuth() {
    this.tokenProvider.destroy();
  }

  logout() {
    return this.apiProvider.get("/auth/logout/");
  }

  attemptAuth(credentials: User) {
    let formData = new FormData();

    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return this.apiProvider.postForm("/auth/login", formData).map(data => {
      this.setAuth(data);
      return data;
    });
  }

  attemptAuthSso(credentials: User) {
    let formData = new FormData();

    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return this.apiProvider.postForm("/auth/sso", formData).map(data => {
      this.setAuth(data);
      return data;
    });
  }

  attemptAuthSsoCode(code: string) {
    return this.apiProvider.get("/auth/sso?code=" + code).map(data => {
      this.setAuth(data);
      return data;
    });
  }

  getProfile(): Promise<any> {
    LogUtil.d(this.TAG, 'get user profile')
    return this.tokenProvider.getProfile()
    .then(profile => {
      if (profile == null) {
        LogUtil.d(this.TAG, 'from api')
        return this.apiProvider.get("/personal/profile").pipe(
          map(res => {
            if (!this.tokenProvider.latestProfile) {
              this.setProfile(res);
            }
            return res;
          })
        ).toPromise()
      }
      return profile
    })
  }

  //registrasi fcm token
  saveFcmToken(token: string) {
    let formData = new FormData();
    formData.append("token", token);

    return this.apiProvider
      .postForm("/personal/register-fcm-token/create", formData)
      .map(data => {
        return data;
      });
  }

  // bypass digunakan untuk bisa menggunakan apps, dengan nip orang lain
  byPass(nip: string) {
    return this.apiProvider.get(`/auth/login/bypass?nip=${nip}`);
  }
}
