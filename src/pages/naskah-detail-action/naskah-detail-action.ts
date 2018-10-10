import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, IonicPage, AlertController, Platform } from "ionic-angular";
import { LogUtil } from "../../utils/logutil";
import { Disposisi } from "../../components/persuratan/disposisi/disposisi";
@IonicPage()
@Component({
  selector: "page-naskah-detail-action",
  templateUrl: "naskah-detail-action.html"
})
export class NaskahDetailActionPage {

  static TAG:string = 'NaskahDetailActionPage'

  private unRegisterBackButtonAction: Function;

  actionData:string = '';
  naskahId: any;
  canShowDialogExit:boolean = false

  @ViewChild('disposisiComponent') disposisiComponent: Disposisi

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dialog: AlertController,
    public platform: Platform
  ) {
    this.naskahId = this.navParams.get("naskahId");
  }

  ionViewDidLoad() {
    this.actionData = this.navParams.get("actionData");
    this.registerAction()
  }

  saveDisposisi() {}

  private isDisposition(): boolean {
    return this.actionData.includes('disposisi')
  }


  homeUpButtonClick() {
    if (this.isDisposition()) {
      this.showDialogExit()
    } else {
      this.navCtrl.pop()
    }
  }

  showDialogExit() {
    let alert = this.dialog.create({
      title: 'Konfirmasi Keluar',
      message: 'Apakah anda yakin untuk keluar dari halaman ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            alert.dismiss()
            return false
          }
        },
        {
          text: 'Keluar',
          handler: () => {
            alert.dismiss().then(() => {
              this.actionData = ''
              this.navCtrl.pop()
            })
            return false
          }
        }
      ]
    });
    alert.present();
  }


/* https://forum.ionicframework.com/t/an-android-register-back-button-action-sample/130058 */
  registerAction(): void {
    this.unRegisterBackButtonAction = this.platform.registerBackButtonAction(() => { 
      LogUtil.d(NaskahDetailActionPage.TAG, "back button clicked")
      LogUtil.d(NaskahDetailActionPage.TAG, this.actionData)
      if (this.isDisposition()) {
        if (this.disposisiComponent.prev() == -1) {
          this.showDialogExit()
        }
      } else {
        this.navCtrl.pop()
      }
      return;
    });
   }
   
   unRegister() {
     this.unRegisterBackButtonAction && this.unRegisterBackButtonAction();
   }

  ionViewWillLeave() {
    this.actionData = ''
    this.unRegister();
  }


}
