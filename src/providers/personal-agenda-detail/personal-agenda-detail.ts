import { Injectable } from "@angular/core";

import { ApiProvider } from "../api/api";

@Injectable()
export class PersonalAgendaDetailProvider {
  constructor(private api: ApiProvider) {}

  // untuk personal -> view agenda -> view detail
  getDetailAgenda(params?: any) {
    return this.api.get(`/personal/calendar?start=${params}&end=${params}`);
  }

  // update agenda
  update(agendaId: number) {
    return this.api.post(`/personal/agenda/update/${agendaId}`);
  }

  //hapus agenda
  delete(agendaId: number) {
    return this.api.get(`/personal/agenda/delete/${agendaId}`);
  }

  edit(agendaId: number) {
    return this.api.get(`/personal/agenda/edit/${agendaId}`);
  }
}
