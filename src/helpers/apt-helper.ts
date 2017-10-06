import { Injectable } from "@angular/core";
import { FileOpener } from "@ionic-native/file-opener";
import { AndroidPermissions } from "@ionic-native/android-permissions";

@Injectable()
export class AptHelper {
  mime: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  constructor(
    private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions
  ) {}

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
}
