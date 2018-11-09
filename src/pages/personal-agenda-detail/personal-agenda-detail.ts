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

@IonicPage()
@Component({
  selector: "page-personal-agenda-detail",
  templateUrl: "personal-agenda-detail.html"
})
export class PersonalAgendaDetailPage {

  static TAG:string = 'PersonalAgendaDetailPage'

  detailAgenda: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private agendaProvider: PersonalAgendaDetailProvider,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastHelper: ToastHelper,
    private loader: LoaderHelper
  ) {}

  ionViewDidLoad() {
    this.getDetailAgenda();
  }

  getDetailAgenda() {
    const date = this.navParams.get("date");

    this.loader.createLoader();

    const agenda = this.agendaProvider.getDetailAgenda(date);

    agenda.subscribe(
      res => {
        this.detailAgenda = res;
        this.loader.dismiss();
      },
      err => {
        this.navCtrl.pop();
        this.loader.dismiss();
      }
    );
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
