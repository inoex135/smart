import { Component } from "@angular/core";
import { NavController, NavParams, IonicPage } from "ionic-angular";

import { PersonalProvider } from "../../providers/personal/personal";
import { LoaderHelper } from "../../helpers/loader-helper";

@Component({
  selector: "page-personal",
  templateUrl: "personal.html"
})
@IonicPage()
export class PersonalPage {
  // date: string[] = ["2017-11-15", "2017-11-16"];
  // type: "string"; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  // readonly: boolean = true;

  // options: CalendarComponentOptions = PersonalCalendarOptions.options();
  eventSource: any;
  selectedDay = new Date();
  viewTitle: string;
  date: any;
  calendar = {
    mode: "month",
    currentDate: this.selectedDay
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private personalProvider: PersonalProvider,
    private loaderHelper: LoaderHelper
  ) {}

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  //func when date is click
  onEventSelected(event) {
    this.selectedDay = event;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev;
  }
  getListEvent() {
    this.loaderHelper.createLoader();
    this.personalProvider
      .getListEvent()
      .then(res => {
        this.eventSource = res;
        this.loaderHelper.dismiss();
      })
      .catch(err => {
        this.loaderHelper.errorHandleLoader(err.error_message, this.navCtrl);
      });

    // this.personalProvider
    //   .agendaPersonal()
    //   .subscribe(res => (this.eventSource = res), err => console.log());
  }

  ionViewDidLoad() {
    this.getListEvent();
  }

  onChange($event) {
    console.log($event);
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
