import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { map } from "rxjs/operators";

@Injectable()
export class MasterPegawaiProvider {
  labelAttribute = "nama"; //label yg akan ditampilkan ke view

  constructor(public http: ApiProvider) {}
  getResults(keyword: string) {
    return this.http
      .get(`/master/pegawai/search?nip=${keyword}&nama=${keyword}`)
      .pipe(
        map(res => {
          return res.content;
        })
      );
  }
}
