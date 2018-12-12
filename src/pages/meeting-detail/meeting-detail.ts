import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MeetingDetailAgendaPage } from "../meeting-agenda/meeting-detail-agenda";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { LogUtil } from "../../utils/logutil";
import { LoaderHelper } from "../../helpers/loader-helper";
<<<<<<< HEAD
import { NotificationProvider } from "../../providers/notification/notification";
=======
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd

@Component({
    selector: "meeting-detail",
    templateUrl: "meeting-detail.html"
  })
@IonicPage()
export class MeetingDetailPage {

    static TAG:string = 'MeetingDetailPage'
    static KEY_DETAIL_ID:string = 'detail_id'

<<<<<<< HEAD
    items:any = {
        agenda: [],
        new_list: []
    }
=======
    items:any = []
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd

    model:any = {
        detailId: '',
        keyword: '',
        page: 1,
        size: 10,
        type: 'today',
        unit: ''
    }

    isInfiniteLoading:boolean = false

    constructor(private navCtrl: NavController, 
        private api: MeetingProvider,
        private navParams: NavParams,
<<<<<<< HEAD
        private loader: LoaderHelper,
        private notification: NotificationProvider
=======
        private loader: LoaderHelper
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
    ) {
        this.model.detailId = this.navParams.get(MeetingDetailPage.KEY_DETAIL_ID)
    }

    ionViewWillEnter() {
        this.fillList()
    }

    private fillList() {
        this.loader.show()
        .then(() => {
            this.api.getDetailMeeting(this.model.detailId)
            .subscribe(
                res => {
                    if (res) {
                        this.items = res
                    }
<<<<<<< HEAD
                    this.readNotification()
=======
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
                    this.loader.dismissLoader()
                },
                err => {
                    this.loader.dismissLoader()
                }
            )
        })
    }

<<<<<<< HEAD
    private async readNotification() {
        this.notification.readMeeting(this.model.detailId)
        .subscribe(res => {}, error => {})
    }

=======
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
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
<<<<<<< HEAD
        return this.items.new_list
=======
        return this.items
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
    }

    private isItemExist(): boolean {
        return this.getItems().length > 0
    }

    private detail(model): void {
        var data = {}
<<<<<<< HEAD
        data[MeetingDetailAgendaPage.KEY_MODEL] = model
=======
        data[MeetingDetailAgendaPage.KEY_AGENDA_ID] = model.agenda_id
        data[MeetingDetailAgendaPage.KEY_TIME_ID] = model.time_id
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
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