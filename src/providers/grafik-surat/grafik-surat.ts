import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class GrafikSuratProvider {
  data: any;
  constructor(private api: ApiProvider) {}

  getSumasData() {
    return this.api.get("/surat/grafik-sumas/umum").map(res => {
      return res.map(mapping => {
        mapping.name = mapping.label;
        mapping.data = mapping.data;
        return mapping;
      });
    });
  }
}
