import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { ApiProvider } from "../api/api";
import { TokenProvider } from "../token/token";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { ENV } from "../../config/environment";

@Injectable()
export class NaskahMasukProvider {
  fileTransfer: FileTransferObject;
  constructor(
    public api: ApiProvider,
    private token: TokenProvider,
    transfer: FileTransfer
  ) {
    this.fileTransfer = transfer.create();
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
    return this.api.get(
      `/surat/masuk/cari?tipe=${type}&page=${page}&size=${size}`
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
    const options = {
      headers: {
        Authorization: "smartdjkn2017mobile",
        token: this.token.latestToken
      },
      httpMethod: "GET"
    };

    return this.fileTransfer
      .download(url, fileDir, false, options)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);

        return err;
      });
  }
}
