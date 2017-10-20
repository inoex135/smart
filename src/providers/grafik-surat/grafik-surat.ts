import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class GrafikSuratProvider {
  constructor(private api: ApiProvider) {}

  getSumasData() {
    return this.api.get("/surat/grafik-sumas/umum");
  }
}
