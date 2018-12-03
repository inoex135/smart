import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { PaymentHistoryDetailPage } from "../payment-history-detail/payment-history-detail";

@Component({
    selector: "meeting-list",
    templateUrl: "meeting-list.html"
  })
@IonicPage()
export class MeetingListPage {

    static TAG:string = 'MeetingListPage'

    constructor(private navCtrl:NavController) {

    }

    detail(model:any) {
        var data = {}
        data[PaymentHistoryDetailPage.TAG] = model
        this.navCtrl.push(PaymentHistoryDetailPage.TAG, data)
    }

}