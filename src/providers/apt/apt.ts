import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../token/token";
import { map } from "rxjs/operators/map";

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

  // get daftar permohonan apt
  getPermohonanList() {
    const url = "/apt/permohonan/pending";

    return this.apiProvider.get(url).pipe(map(res => res.content));
  }

   getPelayananList() {
    const url = "/apt/pelayanan";
    const data = this.apiProvider.get(url);
    console.log("after getting list pelayanan"+ data);
    return data;
  }

  search(keyword:string, page: number = 0, size: number = 10) {
   return this.apiProvider.get(`/apt/permohonan/pending?keyword=${keyword}&page=${page}&size=${size}`);
  }

  searchByTipe(keyword:string, page: number = 0, size: number = 10) {
    
    return this.apiProvider.get(`/apt/permohonan/pending?layanan=${keyword}&page=${page}&size=${size}`);
    
  }

  // get list notifikasi apt

  getListNotification() {
    return this.apiProvider
      .get("/personal/notification/apt")
      .pipe(map(data => data.content));
  }

  // get detail apt
  getDetailApt(aptId: number) {
    return this.apiProvider.get(`/apt/permohonan/detail/${aptId}`);
  }

  // get detail apt pratinjau
  getDetailAptAction(action: string,aptId: number) {

    return this.apiProvider.get(`/apt/permohonan/${action}/${aptId}`);
  }

  verifikasi(id:number,status:any){

  console.log("inside verifikasi provider");
  const statusString = status.status;
   return this.apiProvider.post(`/apt/permohonan/verifikasi/${id}?status=${statusString}`); 
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
