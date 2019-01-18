import { Component } from "@angular/core";
import { NavController, NavParams, IonicPage, AlertController, Platform } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-naskah-detail-action",
  templateUrl: "naskah-detail-action.html"
})
export class NaskahDetailActionPage {

  static TAG:string = 'NaskahDetailActionPage'

  actionData:string = '';
  naskahId: any;
  canShowDialogExit:boolean = false

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
  }

  saveDisposisi() {}

  private isDisposition(): boolean {
    return this.actionData.includes('disposisi')
  }


  homeUpButtonClick() {
  //  if (this.isDisposition()) {
  //    this.showDialogExit()
  //  } else {
      this.navCtrl.pop()
  //  }
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
    alert.present()
  }

}
