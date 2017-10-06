import { Injectable } from "@angular/core";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { AndroidPermissions } from "@ionic-native/android-permissions";

@Injectable()
export class AptHelper {
  mime: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  constructor(
    private file: File,
    private fileOpener: FileOpener,
    private fileTransfer: FileTransfer,
    private androidPermissions: AndroidPermissions
  ) {}

  openFile(directory, mime = this.mime) {
    return this.fileOpener
      .open(directory, mime)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  }

  checkPermission() {
    return this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      )
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  }

  requestPermission() {
    return this.androidPermissions
      .requestPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
