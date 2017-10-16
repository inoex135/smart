import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { ApiProvider } from "../api/api";
import { TokenProvider } from "../token/token";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { User } from "../../models/users";

@Injectable()
export class UserProvider {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject
    .asObservable()
    .distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    public http: Http,
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

  attemptAuth(credentials) {
    let formData = new FormData();

    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return this.apiProvider.postForm("/auth/login", formData).map(data => {
      this.setAuth(data);
      return data;
    });
  }
}
