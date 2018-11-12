import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";
import { LogUtil } from "../utils/logutil";

@Injectable()
export class LoaderHelper {
  
  TAG:string = 'LoaderHelper'
  
  loading:any
  newLoading:any
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
    if (!this.isPresent()) {
      this.isLoaderPresent = true
      this.newLoading = this.loadingCtrl.create({
        content: message,
        dismissOnPageChange: true
      })
      this.newLoading.onDidDismiss(() => {
        LogUtil.d(this.TAG, "loader on dismiss set present to false")
        this.isLoaderPresent = false
      })
      return this.newLoading.present()
      .then(() => {
        this.isLoaderPresent = true
        return Promise.resolve({present: this.isPresent()})
      })
    }
    return Promise.resolve({present: this.isPresent()})
  }

  dismiss() {
    this.isLoaderPresent = false
    return this.loading.dismiss()
  }

  dismissLoader() {
    LogUtil.d(this.TAG, "dismiss loader")
    if (this.isPresent()) {
      this.newLoading.dismiss().then(() => {
        this.isLoaderPresent = false
      }).catch(e => {
        LogUtil.d(this.TAG, "catch error here")
        LogUtil.d(this.TAG, e)
      })
    }
  }

  notPresents() {
    LogUtil.d(this.TAG, "force set loader present to false")
    this.isLoaderPresent = false
  }

  isPresent(): boolean {
    LogUtil.d(this.TAG, "is loader present: " + this.isLoaderPresent)
    return this.isLoaderPresent
  }

}
