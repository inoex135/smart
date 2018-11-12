import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";
import { LogUtil } from "../utils/logutil";

@Injectable()
export class LoaderHelper {
  
  TAG:string = 'LoaderHelper'
  
  loading:any
  isLoaderPresent:boolean = false

  constructor(private loadingCtrl: LoadingController) {}

  createLoader(message: string = "Loading....."): LoadingController {
    this.loading = this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    })
    return this.loading.present()
  }

  errorHandleLoader(message: string = "Error", nav?: any) {
    this.loading.setContent(message);

    setTimeout(() => {
      this.dismiss();
      nav.pop();
    }, 1000);
  }

  show(message: string = "Loading.....") {
    LogUtil.d(this.TAG, "is loader present: " + this.isPresent())
    if (!this.isPresent()) {
      this.isLoaderPresent = true
      this.loading = this.loadingCtrl.create({
        content: message,
        dismissOnPageChange: true
      })
      this.loading.present().then(() => {
        LogUtil.d(this.TAG, "present set to true")
        this.isLoaderPresent = true
      })
    }
  }

  dismiss() {
    this.isLoaderPresent = false
    return this.loading.dismiss()
  }

  dismissLoader() {
    if (this.isLoaderPresent) {
      this.isLoaderPresent = false
      this.loading.dismiss()
    }
  }

  isPresent(): boolean {
    return this.isLoaderPresent
  }

}
