import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/errorObservable";

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
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const err = error || "";
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return ErrorObservable.create(errMsg);
  }

  get(path: string) {
    return this.http
      .get(`${ENV.API_URL}${path}`, { headers: this.setHeaders() })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  put(path: string, body: Object = {}) {
    return this.http
      .put(`${ENV.API_URL}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  post(path: string, body: Object = {}) {
    return this.http
      .post(`${ENV.API_URL}${path}`, body, { headers: this.setHeaders() })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  delete(path: string) {
    return this.http
      .delete(`${ENV.API_URL}${path}`, { headers: this.setHeaders() })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  // POST data as FormData
  postForm(path: string, body: Object = {}) {
    return this.http
      .post(`${ENV.API_URL}${path}`, body, {
        headers: this.setHeadersForm()
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }
}
