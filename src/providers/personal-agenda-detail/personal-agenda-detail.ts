import { Injectable } from "@angular/core";

import { ApiProvider } from "../api/api";
import { AgendaDetailDummy } from "../../dummy/agenda-detail.dummy";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class PersonalAgendaDetailProvider {
  constructor(private api: ApiProvider) {}

  // untuk personal -> view agenda -> view detail
  getDetailAgenda(params?: any) {
    return this.api.get(`/personal/calendar?start=${params}&end=${params}`);
  }
}
