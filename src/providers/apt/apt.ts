import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { ApiProvider } from "../api/api";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../token/token";
import { LoadingController } from "ionic-angular";

@Injectable()
export class AptProvider {
  fileTransfer: FileTransferObject;
  fileDir: string;

  constructor(
    public http: Http,
    public apiProvider: ApiProvider,
    transfer: FileTransfer,
    private token: TokenProvider,
    private loadingCtrl: LoadingController
  ) {
    this.fileTransfer = transfer.create();
  }

  getPermohonanList() {
    const url = "/apt/permohonan/index";

    return this.apiProvider.get(url).map(res => res.content);
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

  download(fileDir) {
    // @todo : dummy url, change when api already
    // const url = `http://www.lkpp.go.id/v3/files/attachments/5_fWwUnTrpMTbexDEmAMSCNDzObHttIcYl.pdf`;

    const url = `${ENV.API_URL}/surat/sumas/excel/template`;

    // const filename = url.split("/").pop();

    // this.fileDir = this.file.externalRootDirectory + "Download" + 'smart.xlsx';
    // console.log(filename);

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
        return err;
      });
  }
}
