import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@Component({
    selector: "meeting-list",
    templateUrl: "meeting-list.html"
  })
@IonicPage()
export class MeetingListPage {

    static TAG:string = 'MeetingListPage'

    constructor(private navCtrl:NavController) {

    }


}