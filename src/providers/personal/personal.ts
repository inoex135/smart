import { Injectable } from "@angular/core";

import { ApiProvider } from "../api/api";
import * as moment from "moment";
import { TokenProvider } from "../token/token";

@Injectable()
export class PersonalProvider {
  data: Array<any> = [];
  user: any;

  constructor(public api: ApiProvider, private tokenProvider: TokenProvider) {}

  async getListEvent(date: any = moment()) {
    const params = await this.getParams(date);

    const url = `/personal/calendar/${params.nip}/${params.startDate}/${params.endDate}`;

    return this.api
      .get(url)
      .map(res => {
        // mapping datetime for calender format
        const data = res.map(datas => {
          datas.startTime = this.convertDateForCalendar(datas.startTime);
          datas.endTime = this.convertDateForCalendar(datas.endTime);

          return datas;
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

  async getParams(date: any) {
    const startDate = moment().startOf("year");
    const endDate = moment().endOf("year");

    const user: any = await this.tokenProvider.getUser();

    const params = {
      startDate: startDate.format("DD-MM-YYYY"),
      endDate: endDate.format("DD-MM-YYYY"),
      nip: user.name
    };

    return params;
  }
}
