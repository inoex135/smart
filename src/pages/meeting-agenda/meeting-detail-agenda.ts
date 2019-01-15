import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ActionSheetController } from "ionic-angular";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { MeetingDelegationPage } from "../meeting-delegation/meeting-delegation";
import { LogUtil } from "../../utils/logutil";
import { LoaderHelper } from "../../helpers/loader-helper";
import { ToastHelper } from "../../helpers/toast-helper";
import { FileHelper } from "../../helpers/file-helper";
import { zip } from "rxjs/observable/zip";
import { NotificationProvider } from "../../providers/notification/notification";

@Component({
    selector: "meeting-detail-agenda",
    templateUrl: "meeting-detail-agenda.html"
})
@IonicPage()
export class MeetingDetailAgendaPage {

    static TAG:string = 'MeetingDetailAgendaPage'
    static KEY_MODEL:string = 'model'
    static KEY_AGENDA_ID:string = 'agenda_id'
    static KEY_TIME_ID:string = 'time_id'

    private model:any = {
        time_id: 0,
        agenda_id: 0,
        confirm_to_attend: false
    }

    private files:Array<any> = []

    constructor(private navCtrl: NavController, 
        private navParams: NavParams, 
        private api: MeetingProvider, 
        private loader: LoaderHelper, 
        private toast: ToastHelper,
        private sheet: ActionSheetController,
        private fileHelper: FileHelper,
        private notification: NotificationProvider
    ) {
        this.model.agenda_id = this.navParams.get(MeetingDetailAgendaPage.KEY_AGENDA_ID)
        this.model.time_id = this.navParams.get(MeetingDetailAgendaPage.KEY_TIME_ID)
    }

    ionViewWillEnter() {
        this.fillList()
    }

    private fillList(): void {
        this.loader.show()
        .then(() => {
            zip(this.api.getFiles(this.getModel().time_id), this.api.getDetailAgenda(this.getModel()))
            .subscribe(([files, time]) => {
                if (time) {
                    this.model = time
                }
                if (files && files.content.length) {
                    this.files = files.content
                }
                this.loader.dismissLoader()
                this.readNotification()
            }, err => {
                this.toast.present('Oops.. terjadi kesalahan!')
                this.loader.dismissLoader()
                this.toast.presentError(err)
            })
        })
    }

    private async readNotification() {
        this.notification.readMeeting(this.getModel().agenda_id)
        .subscribe(res => {}, error => {})
    }

    private getModel(): any {
        return this.model
    }

    private delegation():void {
        let data = {}
        data[MeetingDelegationPage.KEY_MODEL] = this.getModel()
        this.navCtrl.push(MeetingDelegationPage.TAG, data)
    }

    private getFiles(): Array<any> {
        return this.files
    }

    private getFileByIndex(index: number): any {
        return this.getFiles()[index]
    }

    private deleteFile(index: number, payload: any) {
        this.loader.show().then(() => {
            this.api.deleteFile(payload)
            .subscribe(res => {
                this.loader.dismissLoader()
                if (res) {
                    this.toast.present('Berhasil hapus file')
                    this.getFiles().splice(index, 1)
                } else {
                    this.toast.present('Gagal hapus file!')
                }
            }, err => {
                this.loader.dismissLoader()
                this.toast.presentError(err)
            })
        })
    }

    private async downloadFile(payload: any, file: any) {
        try {
            const targetPath = this.fileHelper.getDownloadDirectory() + '/' + file.filename
            const url = this.api.downloadFile(payload)
            LogUtil.d(MeetingDetailAgendaPage.TAG, "url: " + url)
            await this.loader.show()
      
            const checkPermission = await this.fileHelper.checkPermission()
      
            if (!checkPermission.hasPermission) {
              await this.fileHelper.requestPermission()
            }

            await this.fileHelper.download(url, targetPath)
            this.loader.dismissLoader()
            this.fileHelper.openFileWindow(file.filename)
      
          } catch (error) {
            this.loader.dismissLoader()
            this.toast.presentError(error)
          }
    }

    private fileOptions(index: number): void {
        let file = this.getFileByIndex(index)
        let payload = {}
        payload['time_id'] = this.getModel().time_id
        payload['file_id'] = file.id
        LogUtil.d(MeetingDetailAgendaPage.TAG, payload)
        let actionSheet = this.sheet.create({
            title: 'Action',
            buttons: [
              {
                text: 'Unduh',
                handler: () => {
                    this.downloadFile(payload, file)
                }
              },
              {
                text: 'Hapus',
                handler: () => {
                    this.deleteFile(index, payload)
                }
              },
              {
                text: 'Batal',
                role: 'cancel'
              }
            ]
          })
       
          actionSheet.present()
    }

    private confirm(): void {
        LogUtil.d(MeetingDetailAgendaPage.TAG, this.getModel())
        this.loader.show()
        .then(() => {
            let postModel = {}
            postModel['confirm_to_attend'] = this.getModel().confirm_to_attend
            postModel['time_id'] = this.getModel().time_id
            this.api.confirm(postModel)
            .subscribe(res => {
                this.loader.dismissLoader()
                if (res) {
                    this.toast.present('Berhasil melakukan konfirmasi kehadiran.')
                    this.api.removeCache(this.getModel().agenda_id)
                    this.api.updateCacheDetailAgenda(this.getModel())
                } else {
                    this.toast.present('Gagal melakukan confirmasi!')
                }
            }, err => {
                this.loader.dismissLoader()
                this.toast.presentError(err)
            })
        })
    }

}