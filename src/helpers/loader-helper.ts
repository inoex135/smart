import { Injectable } from "@angular/core";
import { LoadingController, NavController } from "ionic-angular";

@Injectable()
export class LoaderHelper {
  loading: any;

  constructor(private loadingCtrl: LoadingController) {}

  createLoader(message: string = "Loading....."): LoadingController {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    return this.loading.present();
  }

  errorHandleLoader(message: string = "Error", nav?: NavController) {
    this.loading.setContent(message);

    setTimeout(() => {
      this.dismiss();
      nav.pop();
    }, 1000);
  }

  dismiss() {
    return this.loading.dismiss();
  }
}
