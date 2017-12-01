import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
import { PersonalAgendaDetailProvider } from "../../providers/personal-agenda-detail/personal-agenda-detail";
import { ToastHelper } from "../../helpers/toast-helper";

@IonicPage()
@Component({
  selector: "page-personal-agenda-detail",
  templateUrl: "personal-agenda-detail.html"
})
export class PersonalAgendaDetailPage {
  detailAgenda: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private agendaProvider: PersonalAgendaDetailProvider,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastHelper: ToastHelper
  ) {
    this.getDetailAgenda();
  }

  ionViewDidLoad() {}

  getDetailAgenda() {
    const date = this.navParams.get("date");
    const agenda = this.agendaProvider.getDetailAgenda(date);

    agenda.subscribe(res => (this.detailAgenda = res), err => false);
  }

  edit(agendaId: number) {
    let profileModal = this.modalController.create("PersonalAgendaEditPage", {
      agendaId: agendaId
    });
    profileModal.present();
  }

  delete(agendaId: number = 0) {
    let alert = this.alertController.create({
      title: "Konfirmasi Hapus Agenda",
      message: "Apakah Agenda Ingin Anda Hapus?",
      buttons: [
        {
          text: "Batal",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Hapus",
          handler: () => {
            this.agendaProvider
              .delete(100000)
              .subscribe(
                res => this.showToast(res.message),
                err => this.showToast(err)
              );
          }
        }
      ]
    });
    alert.present();
  }

  showToast(message: string) {
    this.toastHelper.present(message);
  }
}
