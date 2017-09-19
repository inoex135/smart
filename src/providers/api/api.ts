import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../token/token";

@Injectable()
export class ApiProvider {
  constructor(public http: Http, public tokenProvider: TokenProvider) {}

  private setHeaders() {
    const headerConfig = {
      "Content-Type": "application/json",
      Authorization: "smartdjkn2017mobile"
    };

    if (this.tokenProvider.latestToken) {
      headerConfig["token"] = this.tokenProvider.latestToken;
    }

    return new Headers(headerConfig);
  }
  // set header for FormData in login
  private setHeadersForm() {
    const headerConfig = { Authorization: "smartdjkn2017mobile" };

    if (this.tokenProvider.latestToken) {
      headerConfig["token"] = this.tokenProvider.latestToken;
    }

    return new Headers(headerConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(path: string) {
    return this.http
      .get(`${ENV.API_URL}${path}`, { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  put(path: string, body: Object = {}) {
    return this.http
      .put(`${ENV.API_URL}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  post(path: string, body: Object = {}) {
    return this.http
      .post(`${ENV.API_URL}${path}`, body, { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  delete(path: string) {
    return this.http
      .delete(`${ENV.API_URL}${path}`, { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map(res => res.json());
  }

  // POST data as FormData
  postForm(path: string, body: Object = {}) {
    return this.http
      .post(`${ENV.API_URL}${path}`, body, { headers: this.setHeadersForm() })
      .catch(this.formatErrors)
      .map(res => res.json());
  }
}
