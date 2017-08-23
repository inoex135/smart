import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { ApiConfig } from '../../config/api.config';
import { User } from '../../models/users';


@Injectable()
export class LoginProvider {

  constructor(public http: Http) {}

  /**
   * Call api login
   *
   * @param user
   * @return Observable
   */
  login(user: User) {
    let request = { user: { email: user.email, password: user.password } };
    let headers: Headers = new Headers();

    headers.append("content-type", "application/json");

    let option = new RequestOptions({ headers: headers });

    return this.http
      .post(ApiConfig.BASE_URL+'api/users/login', request, option)
      .map(res => res.json());
  }
  
  /**
   * Call api logout
   */
  logout() {}
  
}
