import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ActionSheetController } from "ionic-angular";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { MeetingDelegationPage } from "../meeting-delegation/meeting-delegation";
import { LogUtil } from "../../utils/logutil";
import { LoaderHelper } from "../../helpers/loader-helper";
import { ToastHelper } from "../../helpers/toast-helper";
import { FileHelper } from "../../helpers/file-helper";
<<<<<<< HEAD
=======
import { zip } from "rxjs/observable/zip";
import { NotificationProvider } from "../../providers/notification/notification";
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd


@Component({
    selector: "meeting-detail-agenda",
    templateUrl: "meeting-detail-agenda.html"
<<<<<<< HEAD
  })
=======
})
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
@IonicPage()
export class MeetingDetailAgendaPage {

    static TAG:string = 'MeetingDetailAgendaPage'
    static KEY_MODEL:string = 'model'
<<<<<<< HEAD

    private model:any = {
        confirm_to_attend: false,
=======
    static KEY_AGENDA_ID:string = 'agenda_id'
    static KEY_TIME_ID:string = 'time_id'

    private model:any = {
        time_id: 0,
        agenda_id: 0,
        confirm_to_attend: false
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
    }

    private files:Array<any> = []

    constructor(private navCtrl: NavController, 
        private navParams: NavParams, 
        private api: MeetingProvider, 
        private loader: LoaderHelper, 
        private toast: ToastHelper,
        private sheet: ActionSheetController,
<<<<<<< HEAD
        private fileHelper: FileHelper
    ) {
        this.model = this.navParams.get(MeetingDetailAgendaPage.KEY_MODEL)
=======
        private fileHelper: FileHelper,
        private notification: NotificationProvider
    ) {
        this.model.agenda_id = this.navParams.get(MeetingDetailAgendaPage.KEY_AGENDA_ID)
        this.model.time_id = this.navParams.get(MeetingDetailAgendaPage.KEY_TIME_ID)
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
    }

    ionViewWillEnter() {
        this.fillList()
    }

    private fillList(): void {
<<<<<<< HEAD
        this.api.getFiles(this.model.time_id)
        .subscribe(
            res => {
                if (res && res.content) {
                    this.files = res.content
                }
            }, 
            err => {

            }
        )
=======
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
            })
        })
    }

    private async readNotification() {
        this.notification.readMeeting(this.getModel().agenda_id)
        .subscribe(res => {}, error => {})
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
    }

    private getModel(): any {
        return this.model
    }

    private delegation():void {
        var data = {}
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
                this.toast.present('Gagal hapus file!')
            })
        })
    }

    private async downloadFile(payload: any, file: any) {
        try {
            const targetPath = this.fileHelper.getDownloadDirectory() + '/' + file.filename
            const url = this.api.downloadFile(payload)
            LogUtil.d(MeetingDetailAgendaPage.TAG, "url: " + url)
            await this.loader.show()
      
            const checkPermission = await this.fileHelper.checkPermission();
      
            if (!checkPermission.hasPermission) {
              await this.fileHelper.requestPermission();
            }

            this.fileHelper.download(url, targetPath)
            this.toast.present("File telah di download");
            this.loader.dismissLoader()
      
          } catch (error) {
            this.loader.dismissLoader()
            this.toast.present(error);
          }
    }

    private fileOptions(index: number): void {
        let file = this.getFileByIndex(index)
        var payload = {}
<<<<<<< HEAD
        payload['time_id'] = this.model.time_id
=======
        payload['time_id'] = this.getModel().time_id
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
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
<<<<<<< HEAD
        LogUtil.d(MeetingDetailAgendaPage.TAG, this.model)
=======
        LogUtil.d(MeetingDetailAgendaPage.TAG, this.getModel())
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
        this.loader.show()
        .then(() => {
            var postModel = {}
            postModel['confirm_to_attend'] = this.getModel().confirm_to_attend
            postModel['time_id'] = this.getModel().time_id
<<<<<<< HEAD
            this.api.confirm(postModel).subscribe(res => {
                this.loader.dismissLoader()
                if (res) {
                    this.toast.present('Berhasil melakukan konfirmasi kehadiran.')
=======
            this.api.confirm(postModel)
            .subscribe(res => {
                this.loader.dismissLoader()
                if (res) {
                    this.toast.present('Berhasil melakukan konfirmasi kehadiran.')
                    this.api.removeCache(this.getModel().agenda_id)
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
                } else {
                    this.toast.present('Gagal melakukan confirmasi!')
                }
            }, err => {
                this.loader.dismissLoader()
                this.toast.present('Gagal melakukan confirmasi!')
            })
        })
    }

}