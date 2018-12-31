import { Injectable } from "@angular/core";
import { FileOpener } from "@ionic-native/file-opener";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { File } from "@ionic-native/file";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { TokenProvider } from "../providers/token/token";
import { LogUtil } from "../utils/logutil";
import { Platform } from "ionic-angular";

@Injectable()
export class FileHelper {

    static TAG:string = 'FileHelper'
    
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
          this.createCacheDownloadDirectory()
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
    const path = this.storage.cacheDirectory
    LogUtil.d(FileHelper.TAG, path)
    return path
  }

  public getDownloadDirectory(): string {
    return this.getBaseFileDirectory() + "download";
  }

  public createCacheDownloadDirectory() {
    LogUtil.d(FileHelper.TAG, "create cache download directory")
    return this.storage.createDir(this.getBaseFileDirectory(), "download", false)
    .then(dirEntry => {
      LogUtil.d(FileHelper.TAG, dirEntry)
    })
    .catch(err => {
      LogUtil.e(FileHelper.TAG, err)
    })
  }

  public isFileExist(filename):Promise<boolean> {
    return this.storage.checkFile(this.getDownloadDirectory(), filename)
  }

  public async download(url: string, targetPath) {
    const token = this.token.getCurrentToken()
    const options = {
      headers: {
        Authorization: "smartdjkn2017mobile",
        token: token
      },
      httpMethod: "GET"
    };

    this.fileTransfer.onProgress(res => {
      LogUtil.d(FileHelper.TAG, res)
    })

    return this.fileTransfer
      .download(url, targetPath, false, options)
      .then(res => {
        return res
      })
      .catch(err => {
        return err
      });
  }

}
