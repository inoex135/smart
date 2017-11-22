import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class HomeProvider {
  constructor(private apiProvider: ApiProvider) {}

  getTotalNotication() {
    return this.apiProvider.get("/personal/notification");
  }
}
