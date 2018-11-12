import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../token/token";
import { map } from "rxjs/operators/map";
import { LogUtil } from "../../utils/logutil";
import { CacheProvider } from "../cache/cache";
import { CacheKey } from "../../constant/cache-key";

@Injectable()
export class AptProvider {

  static TAG:string = 'AptProvider'

  fileTransfer: FileTransferObject;
  fileDir: string;

  constructor(
    public apiProvider: ApiProvider,
    transfer: FileTransfer,
    private token: TokenProvider,
    private cache: CacheProvider
  ) {
    this.fileTransfer = transfer.create();
  }

  // get daftar permohonan apt
  getPermohonanList(page: number = 0, size: number = 10) {
    const url = `/apt/permohonan/pending?page=${page}&size=${size}`;

    return this.apiProvider.get(url).pipe(map(res => res.content));
  }

  getPelayananList() {  
    return this.cache.get(CacheKey.APT_PELAYANANS)
    .then(pelayanan => {
      if (pelayanan == null) {
        LogUtil.d(AptProvider.TAG, "cache null or expired get from api instead ")
        return this.apiProvider.get("/apt/pelayanan").map(result => {
          var data:any = {}
          data['response'] = result
          if (result) {
            data['when'] = Date.now() + CacheProvider.FIVE_MINUTES
            this.cache.put(CacheKey.APT_PELAYANANS, data)
          }
          return data
        }).toPromise()
      }
      return pelayanan
    })
  }

  search(
    keyword: string,
    layananId: number,
    page: number = 0,
    size: number = 10
  ) {
    return this.apiProvider
      .get(
        `/apt/permohonan/pending?keyword=${keyword}&layanan=${layananId}&page=${page}&size=${size}`
      )
      .pipe(map(data => data.content));
  }

  searchByTipe(keyword: string, page: number = 0, size: number = 10) {
    return this.apiProvider.get(
      `/apt/permohonan/pending?layanan=${keyword}&page=${page}&size=${size}`
    );
  }

  // get list notifikasi apt

  getListNotification(page: number = 0, size: number = 10) {
    return this.apiProvider
      .get(`/personal/notification/apt?page=${page}&size=${size}`)
      .pipe(map(data => data.content));
  }

  readNotifikasi(aptId: any) {
    let formData = new FormData();
    formData.append("idList", aptId);
    formData.append("tipe", "apt");

    return this.apiProvider.postForm("/personal/notification/read/", formData);
  }

  // get detail apt
  getDetailApt(aptId: number) {
    return this.apiProvider.get(`/apt/permohonan/detail/${aptId}`);
  }

  agendakanApt(params: any) {
    return this.apiProvider.post("/apt/permohonan/agendakan", params);
  }

  tidakAgendakanApt(params: any) {
    return this.apiProvider.post("/apt/permohonan/tolak", params);
  }

  // get detail apt pratinjau
  getDetailAptAction(action: string, aptId: number) {
    return this.apiProvider.get(`/apt/permohonan/${action}/${aptId}`);
  }

  verifikasi(id: number, status: any) {
    const statusString = status.status;
    return this.apiProvider.post(
      `/apt/permohonan/verifikasi/${id}?status=${statusString}`
    );
  }

  download(fileId: number, targetPath) {
    // @todo : dummy url, change when api already
    // const url = `http://www.lkpp.go.id/v3/files/attachments/5_fWwUnTrpMTbexDEmAMSCNDzObHttIcYl.pdf`;

    const url = `${ENV.API_URL}/apt/permohonan/download/${fileId}`;

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
      .download(url, targetPath, false, options)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  }

  downloadProgress() {
    this.fileTransfer.onProgress(res => {
      console.log(res);
    });
  }

  getDekatBatasWaktu(keyword: string, page: number = 0, size: number = 10) {
    return this.apiProvider
      .get(`/apt/permohonan/dekat?page=${page}&size=${size}`)
      .pipe(map(res => res.content));
  }

  getLewatiBatasWaktu(keyword: string, page: number = 0, size: number = 10) {
    return this.apiProvider
      .get(`/apt/permohonan/lewat?page=${page}&size=${size}`)
      .pipe(map(res => res.content));
  }
}
