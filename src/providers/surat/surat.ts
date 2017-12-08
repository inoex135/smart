import { Injectable } from "@angular/core";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";

import { ApiProvider } from "../api/api";

import { TokenProvider } from "../token/token";
import { ENV } from "../../config/environment";

@Injectable()
export class SuratProvider {
  constructor(
    public api: ApiProvider,
    public transfer: FileTransfer,
    public file: File,
    public token: TokenProvider
  ) {}

  fileTransfer: FileTransferObject = this.transfer.create();

  async getSumasTemplateExcel() {
    const url = `${ENV.API_URL}/surat/sumas/excel/template`;
    // const url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";

    // File name only
    // var filename = url.split("/").pop();

    let fileDirectory: string = this.file.dataDirectory + "1504670828948.xlsx";

    const response = await this.fileTransfer.download(
      url,
      fileDirectory,
      true,
      this.getHeaders()
    );

    return response.toURL();
    // .then(entry => console.log(entry));

    // const data = await entry;
    // return data;
  }

  getHeaders() {
    const options: Object = {};
    let headers = {};

    headers["Authorization"] = "smartdjkn2017mobile";
    headers["token"] = this.token.latestToken;
    options["headers"] = headers;

    return options;
  }

  //profile 1 yaitu sekretaris, 2 adalah personal
  getTotalPersuratan(profile: number = 1) {
    return this.api.get(`/surat/total?is_profile=${profile}`);
  }

  simpanSelesai(detail: any, data: any) {
    let formData = new FormData();

    if (detail.naskahPermohonan == "ya") {
      formData.append("status", data.status);
    }

    formData.append("tanggal_selesai", "20-12-2017");
    formData.append("catatan_selesai", data.catatanSelesai);
    formData.append("lokasi_arsip", data.lokasiArsip);
    formData.append("klasifikasi_arsip", data.klasifikasiArsip);
    formData.append("jra_unit", data.unit);

    return this.api.postForm(`/surat/selesai/create/${detail.id}`, formData);
  }
}
