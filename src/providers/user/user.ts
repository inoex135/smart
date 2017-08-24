import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiProvider } from '../api/api';
import { TokenProvider } from '../token/token';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http, public apiProvider: ApiProvider, public tokenProvider: TokenProvider) {}
  
  // verify token yang ada di storage
  populate() {
    this.tokenProvider.getToken().then(token => {
      // if token available/verify, set user info
      if (token) {
        this.apiProvider.get('/user').subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth
        )
      } else {
        this.purgeAuth();
      }
    })
  }
  
  setAuth(user: any) {
    this.tokenProvider.saveToken(user.token).then(() => {})
  }
  
  purgeAuth() {
    this.tokenProvider.destoryToken()
  }
  

  attemptAuth(credentials) {
    return this.apiProvider.post('/users/login', credentials)
      .map(data => {
        this.setAuth(data.user);
        return data;
      })
  }
}
