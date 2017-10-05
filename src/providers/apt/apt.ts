import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { ApiProvider } from "../api/api";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../token/token";
import { LoadingController } from "ionic-angular";

@Injectable()
export class AptProvider {
  fileTransfer: FileTransferObject;

  constructor(
    public http: Http,
    public apiProvider: ApiProvider,
    private transfer: FileTransfer,
    private file: File,
    private token: TokenProvider,
    private loadingCtrl: LoadingController
  ) {
    this.fileTransfer = transfer.create();
  }

  getPermohonanList() {
    const data = [
      {
        id: 1,
        title: "PKN00000000000000",
        image: "assets/images/avatar-small/0.jpg",
        description: "Pengelolaan Kekayaan Negara",
        shortDescription: "Country: Germany",
        longDescription:
          "Penetapan Status Penggunaan Barang Milik Negara Selain Tanah Dan/Atau Bangunan",
        status: "BELUM VERIFIKASI",
        date: "12 September 2017",
        iconLike: "icon-thumb-up",
        iconFavorite: "icon-heart",
        iconShare: "icon-share-variant"
      },
      {
        id: 1,
        title: "PKN00000000000000",
        image: "assets/images/avatar-small/0.jpg",
        description: "Pengelolaan Kekayaan Negara",
        shortDescription: "Country: Germany",
        longDescription:
          "Penetapan Status Penggunaan Barang Milik Negara Selain Tanah Dan/Atau Bangunan",
        status: "BELUM VERIFIKASI",
        date: "12 September 2017",
        iconLike: "icon-thumb-up",
        iconFavorite: "icon-heart",
        iconShare: "icon-share-variant"
      }
    ];
    return data;
  }

  getDetail() {
    const detail = {
      id: 1,
      title: "PKN00000000000000",
      image: "assets/images/avatar-small/0.jpg",
      description: "Pengelolaan Kekayaan Negara",
      shortDescription: "Country: Germany",
      longDescription:
        "Penetapan Status Penggunaan Barang Milik Negara Selain Tanah Dan/Atau Bangunan",
      perihal: "-",
      status: "BELUM VERIFIKASI",
      date: "12 September 2017",
      iconLike: "icon-thumb-up",
      iconFavorite: "icon-heart",
      iconShare: "icon-share-variant"
    };

    return detail;
  }

  download() {
    const url = `${ENV.API_URL}/surat/sumas/excel/template`;
    const options = {
      headers: {
        Authorization: "smartdjkn2017mobile",
        token: this.token.latestToken
      },
      httpMethod: "GET"
    };

    return this.fileTransfer.download(
      url,
      this.file.dataDirectory,
      false,
      options
    );
  }
}
