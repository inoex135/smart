import { Component } from "@angular/core";
import { NavController, NavParams, IonicPage, AlertController, Platform } from "ionic-angular";
@IonicPage()
@Component({
  selector: "page-naskah-detail-action",
  templateUrl: "naskah-detail-action.html"
})
export class NaskahDetailActionPage {

  actionData:string = '';
  naskahId: any;

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
    this.platform.registerBackButtonAction(() => {
      this.backButtonClick()
    })
  }

  saveDisposisi() {}

  backButtonClick() {
    if (this.actionData.includes('disposisi')) {
      this.showDialogExit()
    } else {
      this.navCtrl.pop()
    }
  }

  showDialogExit() {
    let alert = this.dialog.create({
      title: 'Konfirmasi Keluar',
      message: 'Apakah anda takin untuk keluar dari halaman ini?',
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
            console.log('Buy clicked')
            alert.dismiss().then(() => {
              this.navCtrl.pop()
            })
            return false
          }
        }
      ]
    });
    alert.present();
  }

}
