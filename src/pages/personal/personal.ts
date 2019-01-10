import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, IonicPage } from "ionic-angular";

import { PersonalProvider } from "../../providers/personal/personal";
import { LoaderHelper } from "../../helpers/loader-helper";
import { NotificationProvider } from "../../providers/notification/notification";
import { NotificationBell } from "../../components/notification-bell/notification-bell";
import { LogUtil } from "../../utils/logutil";
import { ToastHelper } from "../../helpers/toast-helper";

@Component({
  selector: "page-personal",
  templateUrl: "personal.html"
})
@IonicPage()
export class PersonalPage {

  static TAG:string = 'PersonalPage'

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

  @ViewChild('bell') bell:NotificationBell

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private personalProvider: PersonalProvider,
    private loaderHelper: LoaderHelper,
    private toast: ToastHelper
  ) {
  }

  ionViewWillEnter() {
    this.getListEvent()
    if (this.bell) {
      this.bell.updateNotification()
    }
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  //func when date is click
  onEventSelected(event) {
    LogUtil.d(PersonalPage.TAG, event)
    this.selectedDay = event;
  }

  onTimeSelected(ev) {
    LogUtil.d(PersonalPage.TAG, ev)
    this.selectedDay = ev;
  }

  ionViewWillLeave() {
    LogUtil.d(PersonalPage.TAG, "view did disappear")
    this.loaderHelper.notPresents()
  }

  getListEvent() {
    this.loaderHelper.show()
    .then(() => {
      this.personalProvider
      .getListEvent()
      .then(res => {
        this.eventSource = res
        this.loaderHelper.dismissLoader()
      })
      .catch(err => {
        LogUtil.e(PersonalPage.TAG, err)
        this.loaderHelper.dismissLoader()
        this.toast.presentError(err)
      })
    })
  }

  onChange($event) {
    console.log($event);
  }

  setLabelColorCalendarDetail(eventType?) {
    let className;

    if (eventType == "Agenda Personal") {
      className = "calendar-card agenda-personal";
    } else if (eventType == "Agenda Sekretaris") {
      className = "calendar-card agenda-sekretaris";
    } else if (eventType == "ABSEN") {
      className = "calendar-card absen";
    } else {
      className = "calendar-card dinas-cuti";
    }

    return className;
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

  getNotificationType():string {
    return NotificationProvider.TYPE_PERSONAL
  }

}
