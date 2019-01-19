import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, Select } from "ionic-angular";
import { MeetingDetailPage } from "../meeting-detail/meeting-detail";
import { NotificationProvider } from "../../providers/notification/notification";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { LogUtil } from "../../utils/logutil";
import { LoaderHelper } from "../../helpers/loader-helper";
import { ToastHelper } from "../../helpers/toast-helper";

@Component({
    selector: "meeting-list-page",
    templateUrl: "meeting-list.html"
  })
@IonicPage()
export class MeetingListPage {

    static TAG:string = 'MeetingListPage'

    @ViewChild("selectTime") select: Select

    items:any = []

    model:any = {
        keyword: '',
        page: 0,
        size: 10,
        type: 'today'
    }

    isInfiniteLoading:boolean = false

    constructor(private navCtrl: NavController, 
        private api: MeetingProvider, 
        private loader: LoaderHelper,
        private toast: ToastHelper
    ) {
        
    }

    ionViewWillEnter() {
        this.fillList(true)
    }

    private fillList(loading:boolean = false) {
        let load = Promise.resolve(loading)
        if (loading) {
            this.loader.show()
        }
        load.then(() => {
            this.api.getMeetings(this.model)
            .subscribe(
                res => {
                    if (res && res.content) {
                        res.content.forEach(element => {
                            this.items.push(element)
                        })
                    }
                    if (loading) {
                        this.loader.dismissLoader()
                    }
                },
                err => {
                    if (loading) {
                        this.loader.dismissLoader()
                    }
                    LogUtil.e(MeetingListPage.TAG, err)
                    this.toast.presentError(err)
                }
            )
        })
    }

    private doInfinite(infiniteScroll) {
        if (this.isInfiniteLoading) {
            infiniteScroll.complete()
            return
        }
        this.isInfiniteLoading = true
        this.model.page++
        setTimeout(() => {
          this.api.getMeetings(this.model).subscribe(
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
                this.toast.presentError(err)
            }
          )
          infiniteScroll.complete()
        }, 500)
    }

    private getItems(): Array<any> {
        return this.items
    }

    private detail(model: any): void {
        let data = {}
        data[MeetingDetailPage.KEY_DETAIL_ID] = model.id
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
        this.model.page = 0
        this.items = []
        this.fillList()
    }

    private isSelectExist() {
        return this.select != null || this.select !== undefined
    }

    private triggerOpenSelect(): void {
        if (this.isSelectExist()) {
            this.select.open()
        }
    }

    private onSelectChange(): void {
        LogUtil.d(MeetingListPage.TAG, this.model)
        this.updateList()
    }

}