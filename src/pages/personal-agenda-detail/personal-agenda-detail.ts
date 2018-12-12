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
import { LoaderHelper } from "../../helpers/loader-helper";
import { NotificationProvider } from "../../providers/notification/notification";

@IonicPage()
@Component({
  selector: "page-personal-agenda-detail",
  templateUrl: "personal-agenda-detail.html"
})
export class PersonalAgendaDetailPage {

  static TAG:string = 'PersonalAgendaDetailPage'
  static KEY_AGENDA_ID = 'agenda_id'

  detailAgenda: any = [];
  private agendaId: any = undefined
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private agendaProvider: PersonalAgendaDetailProvider,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastHelper: ToastHelper,
    private loader: LoaderHelper,
    private notifaction: NotificationProvider
  ) {
    this.agendaId = this.navParams.get(PersonalAgendaDetailPage.KEY_AGENDA_ID)
  }

  ionViewDidLoad() {
    if (this.agendaId) {
      this.loader.show()
      .then(() => {
        this.agendaProvider.getDetail(this.agendaId)
        .subscribe(
          res => {
            this.detailAgenda = res
            this.loader.dismissLoader()
            this.readNotification()
          },
          err => {
            this.navCtrl.pop()
            this.loader.dismissLoader()
          }
        )
      })
    } else {
      this.getDetailAgenda();
    }
  }

  private async readNotification() {
    this.notifaction.readPersonalAgenda(this.agendaId)
    .subscribe(res => {}, error => {})
  }

  getDetailAgenda() {
    const date = this.navParams.get("date");

    this.loader.show()
    .then(() => {
      this.agendaProvider.getDetailAgenda(date)
      .subscribe(
        res => {
          this.detailAgenda = res
          this.loader.dismissLoader()
        },
        err => {
          this.navCtrl.pop()
          this.loader.dismissLoader()
        }
      )
    })
  }

  edit(agendaId: number) {
    let editModalAgenda = this.modalController.create(
      "PersonalAgendaEditPage",
      {
        agendaId: agendaId
      }
    );
    editModalAgenda.onDidDismiss(() => {
      this.getDetailAgenda();
    });
    editModalAgenda.present();
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
            this.agendaProvider.delete(agendaId).subscribe(res => {
              this.showToast(res.message);
              this.getDetailAgenda();
            }, this.showToast);
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
