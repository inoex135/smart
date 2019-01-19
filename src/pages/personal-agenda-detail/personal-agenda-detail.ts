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
import { LogUtil } from "../../utils/logutil";

@IonicPage()
@Component({
  selector: "page-personal-agenda-detail",
  templateUrl: "personal-agenda-detail.html"
})
export class PersonalAgendaDetailPage {

  static TAG:string = 'PersonalAgendaDetailPage'
  static KEY_AGENDA_ID = 'agenda_id'
  static KEY_MODEL = 'model'


  detailAgenda: any = []
  private agendaId: any = undefined
  detail:any = {}
  notificationModel:any = {}

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
    this.notificationModel = this.navParams.get(PersonalAgendaDetailPage.KEY_MODEL)
  }

  ionViewDidLoad() {
    if (this.fromNotification()) {
      this.loader.show()
      .then(() => {
        this.agendaProvider.getDetail(this.agendaId)
        .subscribe(
          res => {
            if (res) {
              this.detail = res
              if (this.notificationModel) {
                this.detail['title'] = this.notificationModel.title
                this.detail['jam'] = this.notificationModel.jam
              }
            }
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
      this.getDetailAgenda()
    }
  }

  private async readNotification() {
    this.notifaction.readPersonalAgenda(this.agendaId)
    .subscribe(res => {}, error => {})
  }

  getDetailAgenda() {
    LogUtil.d(PersonalAgendaDetailPage.TAG, 'get by date')
    const date = this.navParams.get("date")

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
          this.toastHelper.presentError(err)
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

  private getDetail():any {
    return this.detail
  }

  private fromNotification():boolean {
    return this.agendaId != undefined && this.agendaId != null
  }

  showToast(message: string) {
    this.toastHelper.present(message);
  }
}
