import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@Component({
    selector: "meeting-detail",
    templateUrl: "meeting-detail.html"
  })
@IonicPage()
export class MeetingDetailPage {

    static TAG:string = 'MeetingDetailPage'

    constructor(private navCtrl:NavController) {

    }

    detail(model:any) {

    }

}