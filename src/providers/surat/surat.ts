import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiProvider } from '../api/api';

import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { File } from "@ionic-native/file";
import { TokenProvider } from '../token/token';
import { ENV } from '../../config/environtment';

@Injectable()
export class SuratProvider {
  constructor(
    public http: Http,
    public api: ApiProvider,
    public transfer: FileTransfer,
    public fileOpener: FileOpener,
    public file: File,
    public token: TokenProvider
  ) {}

  fileTransfer: FileTransferObject = this.transfer.create();

  async getSumasTemplateExcel() {
    const url = `${ENV.API_URL}/surat/sumas/excel/template`;
    // const url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";
    
    // File name only
    var filename = url.split("/").pop();

    let fileDirectory: string = this.file.dataDirectory + "1504670828948.xlsx";

    return await this.fileTransfer.download(url, fileDirectory, true, this.getHeaders())
      .then(entry => console.log(entry))
      .catch(err => console.log(err));
  }

  getHeaders() {
    const options: Object = {};
    let headers = {};
    
    headers["Authorization"] = "smartdjkn2017mobile";
    headers["token"] = this.token.latestToken;
    options["headers"] = headers;
    
    return options;
  }
}
