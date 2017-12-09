import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { map } from "rxjs/operators/map";

@Injectable()
export class NaskahNotifikasiProvider {
  constructor(private apiProvider: ApiProvider) {}

  getNotifikasi(page: number = 0, size: number = 10) {
    return this.apiProvider
      .get(`/personal/notification/persuratan?page=${page}&size=${size}`)
      .pipe(map(data => data.content));
  }
}
