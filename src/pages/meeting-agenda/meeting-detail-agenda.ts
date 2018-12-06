import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@Component({
    selector: "meeting-detail-agenda",
    templateUrl: "meeting-detail-agenda.html"
  })
@IonicPage()
export class MeetingDetailAgendaPage {

    static TAG:string = 'MeetingDetailAgendaPage'
    static KEY_MODEL:string = 'model'

    constructor(private navCtrl:NavController) {

    }

}