import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MeetingDetailAgendaPage } from "../meeting-agenda/meeting-detail-agenda";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { LogUtil } from "../../utils/logutil";

@Component({
    selector: "meeting-detail",
    templateUrl: "meeting-detail.html"
  })
@IonicPage()
export class MeetingDetailPage {

    static TAG:string = 'MeetingDetailPage'
    static KEY_MODEL:string = 'model'

    items:any = {
        agenda: [],
        new_list: []
    }

    model:any = {
        detail: '',
        keyword: '',
        page: 1,
        size: 10,
        type: 'today',
        year: 2018,
        month: 12,
        unit: ''
    }

    isInfiniteLoading:boolean = false

    constructor(private navCtrl: NavController, 
        private api: MeetingProvider,
        private navParams: NavParams) {
        this.model.detail = this.navParams.get(MeetingDetailPage.KEY_MODEL)
    }

    ionViewWillEnter() {
        this.fillList()
    }

    private fillList() {
        this.api.getDetailMeeting(this.model.detail.id)
        .subscribe(
            res => {
                LogUtil.d(MeetingDetailPage.TAG, res)
                if (res) {
                    this.items = res
                }
            },
            err => {

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
        return this.items.new_list
    }

    private isItemExist(): boolean {
        return this.getItems().length > 0
    }

    private detail(model): void {
        var data = {}
        data[MeetingDetailAgendaPage.KEY_MODEL] = model
        this.navCtrl.push(MeetingDetailAgendaPage.TAG, data)
    }

    private search(keyword: any): void {
        LogUtil.d(MeetingDetailPage.TAG, "keyword: " + keyword)
        this.model.keyword = keyword
        this.updateList()
    }

    private updateList(): void {
        this.model.page = 1
        this.items = []
        this.fillList()
    }

}