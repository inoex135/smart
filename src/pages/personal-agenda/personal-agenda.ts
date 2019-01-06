import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { TimelineType } from "../../constant/TimelineType";
import { PersonalProvider } from "../../providers/personal/personal";
import { LoaderHelper } from "../../helpers/loader-helper";
@IonicPage()
@Component({
  selector: "page-personal-agenda",
  templateUrl: "personal-agenda.html"
})
export class PersonalAgendaPage {
  public items: any;
  public type: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private personalProvider: PersonalProvider,
    private loaderHelper: LoaderHelper
  ) {
    this.type = TimelineType.AGENDA
  }

  ionViewWillEnter() {
    this.getDataList()
  }

  getDataList() {
    this.loaderHelper.show()
    .then(() => {
      this.personalProvider.listAgenda().subscribe(
        res => {
          this.items = res
          this.loaderHelper.dismissLoader()
        },
        err => {
          this.loaderHelper.dismissLoader()
        }
      )
    })
  }

  detailAgenda(date: any) {
    this.navCtrl.push("PersonalAgendaDetailPage", { date: date });
  }
}
