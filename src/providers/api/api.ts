import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../token/token";

@Injectable()
export class ApiProvider {
  constructor(public http: HttpClient, public tokenProvider: TokenProvider) {}

  private setHeaders() {
    // set header
    if (this.tokenProvider.latestToken) {
      return new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "smartdjkn2017mobile")
        .set("token", this.tokenProvider.latestToken);
    }

    return new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "smartdjkn2017mobile");
  }

  // set header for FormData in login
  private setHeadersForm() {
    if (this.tokenProvider.latestToken) {
      return new HttpHeaders().append("token", this.tokenProvider.latestToken);
    }

    return new HttpHeaders().set("Authorization", "smartdjkn2017mobile");
  }

  private formatErrors(error: any) {
    return Observable.throw(error);
  }

  get(path: string) {
    return this.http
      .get(`${ENV.API_URL}${path}`, { headers: this.setHeaders() })
      .catch(this.formatErrors);
  }

  put(path: string, body: Object = {}) {
    return this.http
      .put(`${ENV.API_URL}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors);
  }

  post(path: string, body: Object = {}) {
    return this.http
      .post(`${ENV.API_URL}${path}`, body, { headers: this.setHeaders() })
      .catch(this.formatErrors);
  }

  delete(path: string) {
    return this.http
      .delete(`${ENV.API_URL}${path}`, { headers: this.setHeaders() })
      .catch(this.formatErrors);
  }

  // POST data as FormData
  postForm(path: string, body: Object = {}) {
    return this.http
      .post(`${ENV.API_URL}${path}`, body, {
        headers: this.setHeadersForm()
      })
      .catch(this.formatErrors);
  }
}
