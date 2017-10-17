import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";

import * as moment from "moment";
import { PersonalProvider } from "../../providers/personal/personal";
import { LoaderHelper } from "../../helpers/loader-helper";

@Component({
  selector: "page-personal",
  templateUrl: "personal.html"
})
export class PersonalPage {
  eventSource: any;
  selectedDay = new Date();
  viewTitle: string;

  calendar = {
    mode: "month",
    currentDate: this.selectedDay
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private personalProvider: PersonalProvider,
    private loaderHelper: LoaderHelper
  ) {}

  getListEvent() {
    this.loaderHelper.createLoader();

    this.personalProvider
      .getListEvent()
      .then(res => {
        this.eventSource = res;
        this.loaderHelper.dismiss();
      })
      .catch(err =>
        this.loaderHelper.errorHandleLoader(err.error_message, this.navCtrl)
      );
  }

  ionViewDidLoad() {
    this.getListEvent();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format("LLLL");
    let end = moment(event.endTime).format("LLLL");

    let alert = this.alertCtrl.create({
      title: "" + event.title,
      subTitle: "From " + start + "<br>" + end,
      buttons: ["OK"]
    });
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
