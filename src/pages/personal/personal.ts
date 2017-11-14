import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  ModalController
} from "ionic-angular";

import * as moment from "moment";
import { PersonalProvider } from "../../providers/personal/personal";
import { LoaderHelper } from "../../helpers/loader-helper";
import { EventModalPage } from "./event-modal/event-modal";
import { CalendarModalOptions } from "ion2-calendar";

@Component({
  selector: "page-personal",
  templateUrl: "personal.html"
})
export class PersonalPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private personalProvider: PersonalProvider,
    private loaderHelper: LoaderHelper,
    private modalCtrl: ModalController
  ) {}
  getListEvent() {
    this.loaderHelper.createLoader();

    this.personalProvider
      .getListEvent()
      .then(res => {
        this.eventSource = res;
        this.loaderHelper.dismiss();
      })
      .catch(
        err => {
          console.log(err);
          this.loaderHelper.dismiss();
        }

        // this.loaderHelper.errorHandleLoader(err.error_message, this.navCtrl)
      );
  }

  ionViewDidLoad() {
    this.getListEvent();
  }

  addEvent() {
    // const modal = this.modalCtrl.create(EventModalPage, {
    //   selectedDay: this.selectedDay
    // });
    // modal.present();
    // // processing data from event modal after dismiss modal
    // modal.onDidDismiss(data => {
    //   if (data) {
    //     let eventData = data;
    //     eventData.startTime = new Date(data.startTime);
    //     eventData.endTime = new Date(data.endTime);
    //     let events = this.eventSource;
    //     events.push(eventData);
    //     this.eventSource = [];
    //     setTimeout(() => {
    //       this.eventSource = events;
    //     });
    //   }
    // });
    this.navCtrl.push("PersonalAgendaAddPage");
  }

  showAllAgenda() {
    this.navCtrl.push("PersonalAgendaPage");
  }
}
