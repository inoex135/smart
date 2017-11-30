import { Injectable } from "@angular/core";

import { ApiProvider } from "../api/api";

@Injectable()
export class PersonalAgendaDetailProvider {
  constructor(private api: ApiProvider) {}

  // untuk personal -> view agenda -> view detail
  getDetailAgenda(params?: any) {
    return this.api.get(`/personal/calendar?start=${params}&end=${params}`);
  }
}
