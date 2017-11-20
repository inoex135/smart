import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class NaskahNotifikasiProvider {
  constructor(private apiProvider: ApiProvider) {}

  getNotifikasi() {
    return this.apiProvider.get("/personal/notification/persuratan");
  }
}
