import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { LogUtil } from "../utils/logutil";

@Injectable()
export class ToastHelper {

  TAG: string = 'ToastHelper'

  constructor(public toastController: ToastController) {}

  private toast(message?: string) {
    return this.toastController.create({
      message: message,
      duration: 3000,
      position: "bottom"
    })
  }

  present(message: any) {
    this.toast(message).present()
  }

  presentError(error: any): void {
    LogUtil.d(this.TAG, 'catch status code from error.')
    LogUtil.d(this.TAG, error)
    let message = 'Terjadi kesalahan!'
    if (error.status && error.status == 401) {
      message = 'Session anda telah berakhir, harap logout dan login kembali!'
    } else if (error.error.error_code) {
      message = `${error.error.error_message || ""}`
    } else if (error.message) {
      message = error.message
    } else if (error instanceof String) {
      message = error.toString()
    }
    this.present(message)
  }

}
