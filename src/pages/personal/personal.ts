import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";

import * as moment from "moment";

@Component({
  selector: "page-personal",
  templateUrl: "personal.html"
})
export class PersonalPage {
  eventSource = [];
  selectedDay = new Date();
  viewTitle: string;

  calendar = {
    mode: "month",
    currentDate: this.selectedDay
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.eventSource = [
      {
        title: "ntak",
        startTime: new Date(Date.UTC(2017, 8, 12)),
        endTime: new Date(Date.UTC(2017, 8, 12))
        // allDay: false
      },
      {
        title: "ntak",
        startTime: new Date(Date.UTC(2017, 8, 2)),
        endTime: new Date(Date.UTC(2017, 8, 5))
        // allDay: false
      }
    ];

    console.log(this.eventSource);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PersonalPage");
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format("LLLL");
    let end = moment(event.endTime).format("LLLL");

    let alert = this.alertCtrl.create({
      title: "" + event.title,
      subTitle: "From" + start + "<br>" + end,
      buttons: ["OK"]
    });
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
