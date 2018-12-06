import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { MeetingDetailPage } from "../meeting-detail/meeting-detail";
import { NotificationProvider } from "../../providers/notification/notification";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { LogUtil } from "../../utils/logutil";

@Component({
    selector: "meeting-list-page",
    templateUrl: "meeting-list.html"
  })
@IonicPage()
export class MeetingListPage {

    static TAG:string = 'MeetingListPage'

    items:Array<any> = []

    model:any = {
        keyword: "",
        page: 1,
        size: 10,
        type: 'weekend'
    }

    isInfiniteLoading:boolean = false

    constructor(private navCtrl: NavController, private api: MeetingProvider) {

    }

    ionViewWillEnter() {
        this.fillList()
    }

    private fillList() {
        this.api.getMeetings(this.model)
        .subscribe(
            res => {
                LogUtil.d(MeetingListPage.TAG, res)
                if (res && res.content) {
                    this.items = res.content
                }
            },
            err => {
                LogUtil.e(MeetingListPage.TAG, err)
            }
        )
    }

    private doInfinite(infiniteScroll) {
        if (this.isInfiniteLoading) {
            return
        }
        this.isInfiniteLoading = true
        this.model.page++
        setTimeout(() => {
          this.api.getMeetings(this.model).subscribe(
            res => {
                this.isInfiniteLoading = false
                if (res && res.content) {
                    res.content.forEach(element => {
                        this.items.push(element)
                    })
                } else {
                    this.model.page--
                }
            },
            err => {
                this.isInfiniteLoading = false
                this.model.page--
            }
          );
          infiniteScroll.complete();
        }, 500);
    }

    private getItems(): Array<any> {
        return this.items
    }

    private detail(model: any): void {
        var data = {}
        data[MeetingDetailPage.KEY_MODEL] = model
        this.navCtrl.push(MeetingDetailPage.TAG, data)
    }

    private isItemExist(): boolean {
        return this.getItems().length > 0
    }

    private getNotificationType(): string {
        return NotificationProvider.TYPE_RAPAT
    }

}