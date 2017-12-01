import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";

import { map, catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

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
      return new HttpHeaders()
        .set("token", this.tokenProvider.latestToken)
        .set("Authorization", "smartdjkn2017mobile");
    }

    return new HttpHeaders().set("Authorization", "smartdjkn2017mobile");
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    // check error if have custom error message from server
    if (error.error.error_code) {
      errMsg = `${error.error.error_message || ""}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return ErrorObservable.create(errMsg);
  }

  private handleErrorForm(httpError: HttpErrorResponse) {
    let errMessage: any;
    let errorData: any = httpError.error;

    if (errorData.error_message) {
      errMessage = errorData.error_message;
    } else {
      errMessage = errorData.data;
    }

    // ketika offline munculkan pesan erroor dari httpError
    if (httpError.error instanceof ProgressEvent) {
      errMessage = httpError.message;
    }

    return ErrorObservable.create(errMessage);
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
      .pipe(map(this.extractData), catchError(this.handleErrorForm));
  }
}
