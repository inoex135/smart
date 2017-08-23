import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiProvider } from '../api/api';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http, public apiProvider: ApiProvider) {}

  populate() { }
  
  setAuth() { }
  
  purgeAuth() { }
  

  attemptAuth(credentials) {
    return this.apiProvider.post('/users/login', credentials)
      .map(data => {        
        this.setAuth()
        return data
      })
  }
}
