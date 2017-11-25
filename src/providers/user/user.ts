import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs/ReplaySubject";

import { ApiProvider } from "../api/api";
import { TokenProvider } from "../token/token";

import { User } from "../../models/users";

@Injectable()
export class UserProvider {
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

  getProfile() {
    return this.apiProvider.get("/personal/profile");
  }
}
