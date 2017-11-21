import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../token/token";

@Injectable()
export class AptProvider {
  fileTransfer: FileTransferObject;
  fileDir: string;

  constructor(
    public apiProvider: ApiProvider,
    transfer: FileTransfer,
    private token: TokenProvider
  ) {
    this.fileTransfer = transfer.create();
  }

  getPermohonanList() {
    const url = "/apt/permohonan/verifikasi/index";

    return this.apiProvider.get(url).map(res => res.content);
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
