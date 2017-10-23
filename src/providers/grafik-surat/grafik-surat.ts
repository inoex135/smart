import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class GrafikSuratProvider {
  data: any;
  url: string = "/surat/grafik-sumas/umum";

  constructor(private api: ApiProvider) {}

  getSumasData() {
    return this.api.get(this.url).map(res => this.mappingDataSumas(res));
  }

  getFilterSumasData(params: any) {
    return this.api
      .get(
        `${this
          .url}?tanggal_dari=${params.startTime}&tanggal_sampai=${params.endTime}`
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
