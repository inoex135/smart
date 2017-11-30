import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()
export class ToastHelper {
  constructor(public toastController: ToastController) {}

  private toast(message?: string) {
    return this.toastController.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
  }
  present(message: any) {
    this.toast(message).present();
  }
}
