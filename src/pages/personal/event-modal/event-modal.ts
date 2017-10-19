import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import * as moment from "moment";
import { PersonalProvider } from "../../../providers/personal/personal";

@Component({
  selector: "event-modal",
  templateUrl: "event-modal.html"
})
export class EventModalPage {
  event = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    location: null,
    title: null,
    invitedUser: []
  };

  minDate = new Date().toISOString();

  topics = [];
  preparedTags = [];

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public viewCtrl: ViewController,
    public personalProvider: PersonalProvider
  ) {
    let preselectedDate = moment(this.navParams.get("selectedDay")).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  getListUser(event: any) {
    // handle jika value keyboard kosong,
    // dan buat error json output gara2 param ulr kosong
    if (event.target.value !== "") {
      this.personalProvider.getListUser(event.target.value).subscribe(res => {
        this.preparedTags = res;
      });
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }
}
