import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class MasterProvider {
  constructor(private api: ApiProvider) {}

  // search pegawai/user
  searchPegawai(params: any) {
    return this.api.get(`/master/pegawai/search?nama=${params}&nip=${params}`);
  }

  // get unit disposisi di page disposisi
  getUnitDisposisi() {
    return this.api.get("/master/unit/disposisi");
  }

  // get petunjuk surat untuk disposisi
  getPetunjuk() {
    return this.api.get("/master/petunjuk-surat/disposisi");
  }

  // get petunjuk surat untuk disposisi
  getSifatSurat() {
    return this.api.get("/master/sifat-surat/disposisi");
  }
}
