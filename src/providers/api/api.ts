import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import { ENV } from '../../config/environtment';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiProvider {
  constructor(public http: Http) {}

  private setHeaders() {
    const headerConfig = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    return new RequestOptions({ headers: new Headers(headerConfig) });
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(path: string) {
    return this.http
      .get(`${ENV.API_URL}${path}`, this.setHeaders)
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  put(path: string, body: Object = {}) {
    return this.http
      .put(`${ENV.API_URL}${path}`, JSON.stringify(body), this.setHeaders)
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  post(path: string, body: Object = {}) {    
    return this.http
      .post(`${ENV.API_URL}${path}`, body, this.setHeaders)
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  delete(path: string) {
    return this.http
      .delete(`${ENV.API_URL}${path}`, this.setHeaders)
      .catch(this.formatErrors)
      .map(res => res.json());
  }
}
