import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import { ENV } from '../../config/environtment';
import { TokenProvider } from '../token/token';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiProvider {
  constructor(public http: Http, public tokenProvider: TokenProvider) {}

  public setHeaders() {
    const headerConfig = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    if (this.tokenProvider.latestToken) {
      headerConfig['Authorization'] = `Token ${this.tokenProvider.latestToken}`;
    }

    return new Headers(headerConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(path: string) {
    return this.http
      .get(`${ENV.API_URL}${path}`, {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  put(path: string, body: Object = {}) {
    return this.http
      .put(`${ENV.API_URL}${path}`, JSON.stringify(body), {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  post(path: string, body: Object = {}) {    
    return this.http
      .post(`${ENV.API_URL}${path}`, body, {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  delete(path: string) {
    return this.http
      .delete(`${ENV.API_URL}${path}`, {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map(res => res.json());
  }
}
