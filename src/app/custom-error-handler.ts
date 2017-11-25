import { ErrorHandler } from "@angular/core";
import { ToastController } from "ionic-angular";

export class CustomErrorHandler implements ErrorHandler {
  constructor(private toast: ToastController) {}
  handleError(err: any): void {
    this.presentToast(err);
  }

  private presentToast(err: any) {
    let toast = this.toast.create({
      message: err,
      duration: 3000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
