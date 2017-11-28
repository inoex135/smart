import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class MasterProvider {
  constructor(private api: ApiProvider) {}

  // search pegawai/user
  searchPegawai(params: any) {
    return this.api.get(`/master/pegawai/search?nama=${params}&nip=${params}`);
  }
}
