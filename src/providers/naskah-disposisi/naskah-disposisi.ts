import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class NaskahDisposisiProvider {
  constructor(public apiProvider: ApiProvider) {}

  // get unit disposisi di page disposisi
  getUnitDisposisi() {
    return this.apiProvider.get("/master/unit/disposisi");
  }

  // get petunjuk surat untuk disposisi
  getPetunjuk() {
    return this.apiProvider.get("/master/petunjuk-surat/disposisi");
  }

  // get petunjuk surat untuk disposisi
  getSifatSurat() {
    return this.apiProvider.get("/master/sifat-surat/disposisi");
  }
}
