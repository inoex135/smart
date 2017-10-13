import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";
@Injectable()
export class LoaderHelper {
  loading: any;

  constructor(private loadingCtrl: LoadingController) {}

  createLoader() {
    this.loading = this.loadingCtrl.create({
      content: "Loading....."
    });
  }
  present() {
    return this.loading.present();
  }

  dismiss() {
    return this.loading.dismiss().catch(() => {});
  }
}
