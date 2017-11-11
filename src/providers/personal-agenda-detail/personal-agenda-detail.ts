import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { ApiProvider } from "../api/api";
import { AgendaDetailDummy } from "../../dummy/agenda-detail.dummy";

@Injectable()
export class PersonalAgendaDetailProvider {
  constructor(private api: ApiProvider) {}

  getDetailAgenda() {
    return AgendaDetailDummy.detail();
  }
}
