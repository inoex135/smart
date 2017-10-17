import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import * as moment from "moment";

@Component({
  selector: "event-modal",
  templateUrl: "event-modal.html"
})
export class EventModalPage {
  event = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    location: null,
    title: null
  };
  minDate = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    let preselectedDate = moment(this.navParams.get("selectedDay")).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }
}
