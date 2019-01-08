import { Injectable } from "@angular/core";
import { FileOpener } from "@ionic-native/file-opener";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { File } from "@ionic-native/file";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { TokenProvider } from "../providers/token/token";
import { LogUtil } from "../utils/logutil";
import { Platform } from "ionic-angular";
import { Mime } from "./mime";
import { ToastHelper } from "./toast-helper";

@Injectable()
export class FileHelper {

    static TAG:string = 'FileHelper'
    
    static PDF_MIME: Mime = {
      type: 'application/pdf',
      extension: '.pdf'
    }

    static DOC_MIME: Mime = {
      type: 'application/msword',
      extension: '.doc'
    }

    static DOCX_MIME: Mime = {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extension: '.docx'
    }

    static SHEET_MIME: Mime = {
      type: "application/vnd.ms-excel",
      extension: '.xls'
    }

    static SHEETX_MIME: Mime = {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      extension: '.xlsx'
    }

    static JPG_MIME: Mime = {
      type: 'image/jpeg',
      extension: '.jpeg'
    }

    static MIMES: Array<Mime> = [
      FileHelper.PDF_MIME, 
      FileHelper.DOC_MIME, 
      FileHelper.DOCX_MIME, 
      FileHelper.SHEET_MIME, 
      FileHelper.SHEETX_MIME,
      FileHelper.JPG_MIME
    ]

    mime: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    fileTransfer: FileTransferObject

    constructor(
        private fileOpener: FileOpener,
        private androidPermissions: AndroidPermissions,
        private storage: File,
        private transfer: FileTransfer,
        private token: TokenProvider,
        private platform: Platform,
        private toast: ToastHelper
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
      .catch(err => this.error(err))
  }

  checkPermission() {
    LogUtil.d(FileHelper.TAG, 'check permission')
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
      .catch(err => this.error(err))
  }

  error(err: any) {
    LogUtil.e(FileHelper.TAG, err)
    return err
  }

  respon(res: any) {
    return res
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
    const token = await this.token.getCurrentToken()
    let options = {
      headers: {
        Authorization: "smartdjkn2017mobile",
        token: token
      },
      httpMethod: "GET"
    }
    LogUtil.d(FileHelper.TAG, options)
    return await this.fileTransfer
    .download(params.url, params.targetPath, false, options)
    .then(res => {
      if (params.callback) {
          params.callback(res)
      }
      return true
    })
    .catch(error => {
      LogUtil.e(FileHelper.TAG, error)
      return false
    }) 
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

  public openFileWindow(filename, callback: any = undefined) {
    this.isFileExist(filename)
    .then(exists => {
      LogUtil.d(FileHelper.TAG, "file: " + filename + " exists: " + exists )
      if (exists) {
        this.toast.present("File berhasil dibuka.")
        const path = this.getDownloadDirectory() + "/" + filename
        if (callback) {
            callback(path)
        } else {
          let mime = this.processMime(path)
          LogUtil.d(FileHelper.TAG, mime)
          if (mime != null) {
            this.openFile(path, mime.type)
          } else {
            this.toast.present("File gagal dibuka, file tidak dikenali!")
          }
        }      
      } else {
        this.toast.present("File gagal dibuka!")
      }
    })
    .catch(error => {
      LogUtil.e(FileHelper.TAG, error)
      this.toast.present("File gagal dibuka!")
    })
  }

  private processMime(filePath: String): Mime {
    let extension = '.' + filePath.substring(filePath.lastIndexOf('/') + 1).split('.').pop()
    for (let i in FileHelper.MIMES) {
      let mime = FileHelper.MIMES[i]
      if (mime.extension === extension) {
        return mime
      }
    }
    return null
  }

}
