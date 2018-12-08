import { Component } from "@angular/core";
import { IonicPage, NavParams } from "ionic-angular";
import { MeetingProvider } from "../../providers/meeting/meeting";

@Component({
    selector: "meeting-delegation",
    templateUrl: "meeting-delegation.html"
  })
@IonicPage()
export class MeetingDelegationPage {

    static TAG:string = 'MeetingDelegationPage'
    static KEY_MODEL:string = 'model'

    constructor(private navParams: NavParams) {}

}