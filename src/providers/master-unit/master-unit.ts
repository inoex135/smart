import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { map } from "rxjs/operators";
import { AutoCompleteService } from "ionic2-auto-complete";

@Injectable()
export class MasterUnitProvider implements AutoCompleteService {
  labelAttribute = "singkatan"; //label yg akan ditampilkan ke view

  constructor(public http: ApiProvider) {}

  getResults(keyword: string) {
    return this.http.get(`/master/unit?query=${keyword}`).pipe(
      map(res => {
        return res.content.filter(item => item.singkatan.toLowerCase());
      })
    );
  }
}
