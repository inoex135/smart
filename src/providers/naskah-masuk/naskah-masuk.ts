import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { ApiProvider } from "../api/api";
import { ENV } from "../../config/environment";
import { FileHelper } from "../../helpers/file-helper";

@Injectable()
export class NaskahMasukProvider {

  TAG:string = 'NaskahMasukProvider'

  constructor(
    public api: ApiProvider,
    private fileHelper: FileHelper
  ) {
    
  }

  getDetailNaskah(naskahId: any) {
    const url = `/surat/masuk/${naskahId}`;

    return this.api.get(url).map(res => {
      return res;
    });
  }

  getNaskahMasuk(page: number = 0, size: number = 10) {
    const url = `/surat/masuk?page=${page}&size=${size}`;
    return this.api.get(url);
  }

  disposisi(dataNaskah: any) {
    const url = "/naskah";
    return this.api.post(url, dataNaskah);
  }

  // list penerima naskah yg ada di naskah-terima page
  getPenerimaNaskah() {
    return this.api.get("/master/pegawai/penerima-naskah");
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

  searchNaskahComplete(jenis: any = "",sifat: any = "",keyword: any = "", page: number = 0, size: number = 10) {
    return this.api.get(
      `/surat/masuk/cari?tipe=${jenis}&sifat=${sifat}&keyword=${keyword}&page=${page}&size=${size}`
      );
  }

  searchNaskahByTipe(type: string, page: number = 0, size: number = 10) {
    // The last segment {type} is required. Available options : permohonan, unit, personal.
    return this.api.get(
      `/surat/masuk/cari?tipe=${type}&page=${page}&size=${size}`
    );
  }

  searchNaskahBySifat(sifat: string, page: number = 0, size: number = 10) {
    // The last segment {type} is required. Available options : permohonan, unit, personal.
    return this.api.get(
      `/surat/masuk/cari?sifat=${sifat}&page=${page}&size=${size}`
    );
  }

  terimaSemuaNaskah(idList: {}) {
    return this.api.post("/surat/masuk/terima-batch", idList);
  }

  riwayatNaskah(naskahId: number) {
    return this.api.get(`/surat/masuk/riwayat/${naskahId}`);
  }
  
  downloadFileSurat(fileId: number, fileDir: any) {
    const url = `${ENV.API_URL}/surat/dokumen/download/${fileId}`;

    return this.fileHelper
      .baseDownload({
        url: url,
        targetPath: fileDir
      }).then(res => {
        return res
      }).catch(err => {
        return err
      })
  }

  updateNotification() {
    this.api.get("notification");
  }

}
