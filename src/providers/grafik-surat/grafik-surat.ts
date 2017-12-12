import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

import * as moment from "moment";

@Injectable()
export class GrafikSuratProvider {
  data: any;
  url: string = "/surat/grafik-sumas/umum";

  constructor(private api: ApiProvider) {}

  paramsStartAndEnd() {
    const date = {
      startTime: moment()
        .startOf("year")
        .format("DD-MM-YYYY"),
      endTime: moment()
        .endOf("year")
        .format("DD-MM-YYYY")
    };

    return date;
  }

  // convert params to new format
  convertParam(param: any) {
    return moment(param).format("DD-MM-YYYY");
  }

  // return params date with new format
  filterParams(params: any) {
    const newDate = {
      startTime: this.convertParam(params.startTime),
      endTime: this.convertParam(params.endTime)
    };

    return newDate;
  }

  chartData(series: any) {
    const chartData = {
      chart: {
        type: "line"
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: moment.months()
      },
      series: series
    };

    return chartData;
  }

  getSumasData() {
    return this.api.get(this.url).map(res => this.mappingDataSumas(res));
  }

  getFilterSumasData(params: any, profile: number = 1) {
    //is_profile = 1 => personal, 2=>sekretaris
    return this.api
      .get(
        `${this.url}?tanggal_dari=${params.startTime}&tanggal_sampai=${
          params.endTime
        }&is_profile=${profile}`
      )
      .map(mapping => this.mappingDataSumas(mapping));
  }

  mappingDataSumas(res) {
    return res.map(mapping => {
      mapping.name = mapping.label;
      mapping.data = mapping.data;
      return mapping;
    });
  }
}
