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
    return this.api.get(url);
  }

  disposisi(dataNaskah: any) {
    const url = "/naskah";
    return this.api.post(url, dataNaskah);
  }

  teruskan(data: any) {
    const url = "/surat/masuk/teruskan";

    return this.api.post(url, data);
  }

  selesai(dataNaskah: any) {
    const url = "/naskah";

    return this.api.post(url, dataNaskah);
  }

  searchNaskah(params: any = "") {
    return this.api.get(`/surat/masuk/cari?keyword=${params}`);
  }

  searchNaskahByTipe(type: string, page: number = 0, size: number = 10) {
    // The last segment {type} is required. Available options : permohonan, unit, personal.
    return this.api.get(`/surat/masuk/cari?tipe=${type}&page=${page}&size=${size}`);
  }

  terimaSemuaNaskah(idList: {}) {
    return this.api.post("/surat/masuk/terima-batch", idList);
  }

  riwayatNaskah(naskahId: number) {
    return this.api.get(`/surat/masuk/riwayat/${naskahId}`);
  }

  downloadFileSurat() {}
}
