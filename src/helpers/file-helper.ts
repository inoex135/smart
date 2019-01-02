import { Injectable } from "@angular/core";
import { FileOpener } from "@ionic-native/file-opener";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { File } from "@ionic-native/file";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { TokenProvider } from "../providers/token/token";
import { LogUtil } from "../utils/logutil";
import { Platform } from "ionic-angular";
import { Mime } from "./mime";

@Injectable()
export class FileHelper {

    static TAG:string = 'FileHelper'
    
    static PDF_MIME:Mime = {
      type: 'application/pdf',
      extension: '.pdf'
    }

    mime: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    fileTransfer: FileTransferObject

    constructor(
        private fileOpener: FileOpener,
        private androidPermissions: AndroidPermissions,
        private storage: File,
        private transfer: FileTransfer,
        private token: TokenProvider,
        private platform: Platform
    ) {
        this.fileTransfer = transfer.create()
        if (this.platform.is("android") || this.platform.is("ios")) {
          this.createAndCreateCacheDownloadDirectory()
        }
    }

  openFile(directory, mime = this.mime) {
    return this.fileOpener
      .open(directory, mime)
      .then(res => this.respon(res))
      .catch(err => this.error(err));
  }

  checkPermission() {
    return this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      )
      .then(res => this.respon(res))
      .catch(err => this.error(err));
  }

  requestPermission() {
    return this.androidPermissions
      .requestPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      )
      .then(res => this.respon(res))
      .catch(err => this.error(err));
  }

  error(err: any) {
    return err;
  }

  respon(res: any) {
    return res;
  }

  public getBaseFileDirectory(): string {
    var path = this.storage.externalCacheDirectory
    if (this.platform.is('ios') ) {
      path = this.storage.documentsDirectory
    }
    LogUtil.d(FileHelper.TAG, path)
    return path
  }

  public getDownloadDirectory(): string {
    return this.getBaseFileDirectory() + "download";
  }

  private createAndCreateCacheDownloadDirectory() {
    LogUtil.d(FileHelper.TAG, "check cache download directory")
    return this.storage.checkDir(this.getBaseFileDirectory() + '/', 'download')
        .then(exists => {
            this.createDoanloadDir(exists)
        })
        .catch(error => {
          LogUtil.e(FileHelper.TAG, error)
          this.createDoanloadDir(false)
        })
  }

  private createDoanloadDir(exists) {
    if (exists) {
      LogUtil.d(FileHelper.TAG, "download directory exists")
      return
    }
    LogUtil.d(FileHelper.TAG, "create cache download directory")
    this.storage.createDir(this.getBaseFileDirectory(), "download", false)
    .then(dirEntry => {
      LogUtil.d(FileHelper.TAG, dirEntry)
    })
    .catch(err => {
      LogUtil.e(FileHelper.TAG, err)
    })

  }

  public isFileExist(filename):Promise<boolean> {
    LogUtil.d(FileHelper.TAG, "does this file exist: " + filename)
    return this.storage.checkFile(this.getDownloadDirectory() + "/", filename)
  }

  public async baseDownload(params: any = {}):Promise<any> {
    LogUtil.d(FileHelper.TAG, params)
    var options = {}
    if (params.options) {
      options = this.getOptions()
    }
    return this.fileTransfer
    .download(params.url, params.targetPath, false, options)
    .then(res => {
      if (params.callback) {
          params.callback(res)
      }
      return true
    })
    .catch(error => {
      return false
    }) 
  }

  public async getOptions() {
    const token = this.token.getCurrentToken()
    const options = {
      headers: {
        Authorization: "smartdjkn2017mobile",
        token: token
      },
      httpMethod: "GET"
    }
    return options
  }

  public async download(url: string, targetPath) {

    this.fileTransfer.onProgress(res => {
      LogUtil.d(FileHelper.TAG, res)
    })

    return this.baseDownload({
      url: url,
      targetPath: targetPath
    })
  }

  public openFileWindow(filename) {
    this.isFileExist(filename)
    .then(exists => {
      LogUtil.d(FileHelper.TAG, "file: " + filename + " exists: " + exists )
      if (exists) {
        window.open(this.getDownloadDirectory() + "/" + filename, '_system', 'location=yes')
      }
    })
  }

}
