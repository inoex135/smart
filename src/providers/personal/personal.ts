import { Injectable } from "@angular/core";

import { ApiProvider } from "../api/api";
import { TokenProvider } from "../token/token";

import * as moment from "moment";
import { IAgendaAdd } from "../../interface/agenda-add";

@Injectable()
export class PersonalProvider {
  data: Array<any> = [];
  user: any;

  constructor(public api: ApiProvider, private tokenProvider: TokenProvider) {}

  async getListEvent(date: any = moment()) {
    const params = await this.getParams(date)

    const url = `/personal/calendar?start=${params.startDate}&end=${
      params.endDate
    }`;

    return this.api
      .get(url)
      .map(res => {
        // mapping datetime for calender format
        const data = res.map(event => {
          event.startTime = this.convertDateForCalendar(event.start_time);
          event.endTime = this.convertDateForCalendar(event.end_time);

          return event;
        });

        return data;
      })
      .toPromise();
  }

  // convert raw date to format calendar need
  convertDateForCalendar(date: any) {
    const formatDate = moment(date);

    const newDate = new Date(
      Date.UTC(formatDate.year(), formatDate.month(), formatDate.date())
    );

    return newDate;
  }
  // get params for get list event
  async getParams(date: any) {
    const startDate = moment().startOf("year");
    const endDate = moment().endOf("year");

    const profile: any = await this.tokenProvider.getCurrentProfile()

    const params = {
      startDate: startDate.format("DD-MM-YYYY"),
      endDate: endDate.format("DD-MM-YYYY"),
      nip: profile.nip
    };

    return params;
  }

  getListUser(name: any) {
    return this.api.get(`/master/pegawai/search?nama=${name}`).map(res => {
      return res.content.map(data => {
        return data.nama;
      });
    });
  }

  agendaPersonal(params: { start: string; end: string }) {
    return this.api.get(
      `/personal/calendar?start=${params.start}&end=${params.end}`
    );
  }

  tambahAgenda(params: IAgendaAdd) {
    let formData = new FormData();
    const unit = params.unit.map(res => {
      return res.kode_utuh;
    });

    const pegawai = params.pegawai.map(res => {
      return res.nip;
    });

    formData.append("is_sekretaris", params.is_sekretaris);
    formData.append("tanggal_mulai", params.tanggal_mulai);
    formData.append("tanggal_akhir", params.tanggal_akhir);
    formData.append("jam_mulai", params.jam_mulai);
    formData.append("jam_akhir", params.jam_akhir);
    formData.append("uraian", params.uraian);
    formData.append("lokasi", params.lokasi);
    formData.append("unit", unit);
    formData.append("pegawai", pegawai);

    return this.api.postForm("/personal/agenda/create", formData);
  }

  getUnit(query: any, number: number = 0, size: number = 10) {
    this.api.get(
      `/api/master/unit?query=${query}&number=${number}&size=${size}`
    );
  }

  detailAgenda() {
    return this.api.get("/personal/");
  }

  listAgenda() {
    return this.api.get("/personal/agenda/daftar");
  }
}
