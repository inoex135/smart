import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { map } from "rxjs/operators/map";

@Injectable()
export class NaskahNotifikasiProvider {
  constructor(private apiProvider: ApiProvider) {}

  getNotifikasi() {
    return this.apiProvider
      .get("/personal/notification/persuratan")
      .pipe(map(data => data.content));
  }
}
