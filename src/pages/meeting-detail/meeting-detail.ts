import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@Component({
    selector: "meeting-detail",
    templateUrl: "meeting-detail.html"
  })
@IonicPage()
export class MeetingDetailPage {

    static TAG:string = 'MeetingDetailPage'
    static KEY_MODEL:string = 'model'

    constructor(private navCtrl:NavController) {

    }

    detail(model:any) {

    }

}