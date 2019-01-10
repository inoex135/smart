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
import { LogUtil } from "../../utils/logutil";
import { Observable } from "rxjs";
import { ERROR_CODES } from "../../constant/error-codes";

@Injectable()
export class ApiProvider {

  static TAG:string = 'ApiProvider'

  constructor(public http: HttpClient, public tokenProvider: TokenProvider) {}

  private getObservableHeaderForm() {
    return Observable.fromPromise(this.tokenProvider.getCurrentToken())
    .map(token => {
      LogUtil.d(ApiProvider.TAG, 'getObservableHeader token: ' + token)
      if (token) {
        return new HttpHeaders()
          .set("token", token)
          .set("Authorization", "smartdjkn2017mobile");
      }
  
      return new HttpHeaders().set("Authorization", "smartdjkn2017mobile");
    })
  }

  private getObservableHeader():Observable<any> {
    return Observable.fromPromise(this.tokenProvider.getCurrentToken())
    .map(token => {
      LogUtil.d(ApiProvider.TAG, 'getObservableHeader token: ' + token)
      if (token) {
        LogUtil.d(ApiProvider.TAG, "current token: " + token)
        return new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("Authorization", "smartdjkn2017mobile")
          .set("token", token);
      }
  
      return new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "smartdjkn2017mobile");
    })
  }

  private extractData(res: Response) {
    let body = res;
    LogUtil.d(ApiProvider.TAG, body)
    return body || {};
  }

  private extractBlob(res: Blob) {
    LogUtil.d(ApiProvider.TAG, res)
    let body = res
    return body || null
  }

  private handleError(error: HttpErrorResponse | any) {
    LogUtil.d(ApiProvider.TAG, error)
    let errMsg: string;
    // check error if have custom error message from server
    if (error.error.error_code) {
      errMsg = `${error.error.error_message || ""}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    if (errMsg.includes('Token not found')) {
      errMsg = ERROR_CODES.MISSING_TOKEN
    }

    if (error.status && error.status >= 400) {
      return ErrorObservable.create(error)
    }

    return ErrorObservable.create(errMsg)
  }

  private handleErrorForm(httpError: HttpErrorResponse) {
    let errMessage: any;
    let errorData: any = httpError.error;

    let errorFormValidasi = errorData.data; //untuk catch error validasi agenda update/create

    if (errorData.error_message) {
      errMessage = errorData.error_message;
    } else {
      errMessage = errorData.data;
    }

    LogUtil.d(ApiProvider.TAG, errMessage)

    if (errorFormValidasi) {
      errMessage = errorFormValidasi;
    }

    // ketika offline munculkan pesan erroor dari httpError
    if (httpError.error instanceof ProgressEvent) {
      errMessage = httpError.message;
    }

    return ErrorObservable.create(errMessage);
  }

  get(path: string) {
    return this.getObservableHeader()
    .mergeMap(header => {
      const url = `${ENV.API_URL}${path}`
      LogUtil.d(ApiProvider.TAG, url)
      LogUtil.d(ApiProvider.TAG, header)
      return this.http.get(url, { headers: header })
      .pipe(map(this.extractData), catchError(this.handleError))
    })
  }

  getBlob(path: string) {
    return this.getObservableHeader()
    .mergeMap(header => {
      const url = `${ENV.API_URL}${path}`
      LogUtil.d(ApiProvider.TAG, url)
      LogUtil.d(ApiProvider.TAG, header)
      return this.http
      .get(url, { 
        headers: header.set("Content-Type", "application/octet-stream"),
        responseType: "blob"
      })
      .pipe(map(this.extractBlob), catchError(this.handleError));
    })
  }

  put(path: string, body: Object = {}) {
    return this.getObservableHeader()
    .mergeMap(header => {
      const url = `${ENV.API_URL}${path}`
      LogUtil.d(ApiProvider.TAG, url)
      LogUtil.d(ApiProvider.TAG, header)
      return this.http
      .put(url, JSON.stringify(body), {
        headers: header
      })
      .pipe(map(this.extractData), catchError(this.handleError));
    })
  }

  post(path: string, body: Object = {}) {
    return this.getObservableHeader()
    .mergeMap(header => {
      const url = `${ENV.API_URL}${path}`
      LogUtil.d(ApiProvider.TAG, url)
      LogUtil.d(ApiProvider.TAG, header)
      return this.http
      .post(url, body, { headers: header })
      .pipe(map(this.extractData), catchError(this.handleError));
    })
  }

  delete(path: string) {
    return this.getObservableHeader()
    .mergeMap(header => {
      const url = `${ENV.API_URL}${path}`
      LogUtil.d(ApiProvider.TAG, url)
      LogUtil.d(ApiProvider.TAG, header)
      return this.http
      .delete(url, { headers: header })
      .pipe(map(this.extractData), catchError(this.handleError));
    })
  }

  // POST data as FormData
  postForm(path: string, body: Object = {}) {
    return this.getObservableHeaderForm()
    .mergeMap(header => {
      const url = `${ENV.API_URL}${path}`
      LogUtil.d(ApiProvider.TAG, url)
      LogUtil.d(ApiProvider.TAG, header)
      return this.http
      .post(url, body, {
        headers: header
      })
      .pipe(map(this.extractData), catchError(this.handleErrorForm))
    })
  }

  getByUrl(path: string) {
    LogUtil.d(ApiProvider.TAG, path)
    return this.http.get(path)
      .pipe(map(this.extractData), catchError(this.handleError))
  }

}
