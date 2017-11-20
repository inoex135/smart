import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { TokenProvider } from "../token/token";
import { Http, Headers } from "@angular/http";
@Injectable()
export class HomeProvider {
  constructor(
    public http: HttpClient,
    private apiProvider: ApiProvider,
    private tokenProvider: TokenProvider
  ) {}

  getTotalNotication() {
    return this.apiProvider.get("/personal/notification");
  }
}
