import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { MeetingDelegationPage } from "../meeting-delegation/meeting-delegation";

@Component({
    selector: "meeting-detail-agenda",
    templateUrl: "meeting-detail-agenda.html"
  })
@IonicPage()
export class MeetingDetailAgendaPage {

    static TAG:string = 'MeetingDetailAgendaPage'
    static KEY_MODEL:string = 'model'

    model:any = {
        files: []
    }

    constructor(private navCtrl: NavController, private navParams: NavParams, private api: MeetingProvider) {
        this.model = this.navParams.get(MeetingDetailAgendaPage.KEY_MODEL)
    }

    ionViewWillEnter() {
        this.fillList()
    }

    private fillList() {
        this.api.getFiles(this.model.time_id)
        .subscribe(
            res => {
                if (res) {
                    this.model.files = res
                }
            }, 
            err => {

            }
        )
    }

    private getModel(): any {
        return this.model
    }

    private delegation() {
        var data = {}
        data[MeetingDelegationPage.KEY_MODEL] = this.getModel()
        this.navCtrl.push(MeetingDelegationPage.TAG, data)
    }

}