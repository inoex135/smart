import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { ApiProvider } from "../api/api";

@Injectable()
export class NaskahMasukProvider {
  constructor(public api: ApiProvider) {}

  getDetailNaskah(naskahId: any) {
    const url = `/surat/masuk/${naskahId}`;

    return this.api.get(url).map(res => {
      return res;
    });
  }

  getNaskahMasuk() {
    const url = "/surat/masuk";
    return this.api.get(url).map(res => res.content);
  }

  disposisi(dataNaskah: any) {
    const url = "/naskah";
    return this.api.post(url, dataNaskah);
  }

  teruskan(dataNaskah: any) {
    const url = "/naskah";

    return this.api.post(url, dataNaskah);
  }

  selesai(dataNaskah: any) {
    const url = "/naskah";

    return this.api.post(url, dataNaskah);
  }

  searchNaskah(params: any) {
    return this.api.get("/surat/masuk/cari?tanggal=07-03-2016");
  }

  searchNaskahByTipe() {
    // The last segment {type} is required. Available options : permohonan, unit, personal.
    return this.api.get("/surat/masuk/tipe/{type}?page=0&size=10");
  }
}
