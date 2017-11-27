import { Injectable } from "@angular/core";

import { ApiProvider } from "../api/api";
import { AgendaDetailDummy } from "../../dummy/agenda-detail.dummy";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class PersonalAgendaDetailProvider {
  constructor(private api: ApiProvider) {}

  getDetailAgenda(params?: any) {
    // let httpParams = new HttpParams().set("start", "John").set("end", "Doe");
    // return this.api.get("/personal/calendar?start=01-01-2017&end=31-12-2017");
    return AgendaDetailDummy.detail();
  }
}
