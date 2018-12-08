import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, Select } from "ionic-angular";
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

    @ViewChild("selectType") select: Select
    items:Array<any> = []

    model:any = {
        keyword: "",
        page: 1,
        size: 10,
        type: 'today'
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
            infiniteScroll.complete()
            return
        }
        this.isInfiniteLoading = true
        this.model.page++
        setTimeout(() => {
          this.api.getDetailMeeting(this.model).subscribe(
            res => {
                this.isInfiniteLoading = false
                if (res && res.content && res.content.length > 0) {
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
          )
          infiniteScroll.complete()
        }, 500)
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

    private search(keyword: any): void {
        this.model.keyword = keyword
        LogUtil.d(MeetingListPage.TAG, "keyword: " + keyword)
        this.updateList()
    }

    private updateList(): void {
        this.model.page = 1
        this.items = []
        this.fillList()
    }

    private triggerOpenSelect(): void {
        this.select.open()
    }

    private onSelectChange(): void {
        LogUtil.d(MeetingListPage.TAG, this.model)
        this.updateList()
    }

}