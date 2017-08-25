import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiProvider } from '../api/api';
import { TokenProvider } from '../token/token';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { User } from '../../models/users';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
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
  populate() {
    this.tokenProvider.getToken().then(token => {
      // if token available/verify, set user info
      if (token) {
        this.apiProvider
          .get("/user")
          .subscribe(data => this.setAuth(data.user), err => this.purgeAuth);
      } else {
        this.purgeAuth();
      }
    });
  }

  setAuth(data: any) {
    this.tokenProvider.saveToken(data.token).then(() => {
      this.currentUserSubject.next(data.user);
      this.isAuthenticatedSubject.next(true);
    });
  }

  purgeAuth() {
    this.tokenProvider.destoryToken();
  }

  attemptAuth(credentials) {
    return this.apiProvider.post("/auth/login", credentials).map(data => {
      this.setAuth(data);
      return data;
    });
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
