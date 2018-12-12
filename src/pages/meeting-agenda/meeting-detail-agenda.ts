import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ActionSheetController } from "ionic-angular";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { MeetingDelegationPage } from "../meeting-delegation/meeting-delegation";
import { LogUtil } from "../../utils/logutil";
import { LoaderHelper } from "../../helpers/loader-helper";
import { ToastHelper } from "../../helpers/toast-helper";
import { FileHelper } from "../../helpers/file-helper";


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
        confirm_to_attend: false,
    }

    private files:Array<any> = []

    constructor(private navCtrl: NavController, 
        private navParams: NavParams, 
        private api: MeetingProvider, 
        private loader: LoaderHelper, 
        private toast: ToastHelper,
        private sheet: ActionSheetController,
        private fileHelper: FileHelper
    ) {
        this.model = this.navParams.get(MeetingDetailAgendaPage.KEY_MODEL)
    }

    ionViewWillEnter() {
        this.fillList()
    }

    private fillList(): void {
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
        payload['time_id'] = this.model.time_id
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
        LogUtil.d(MeetingDetailAgendaPage.TAG, this.model)
        this.loader.show()
        .then(() => {
            var postModel = {}
            postModel['confirm_to_attend'] = this.getModel().confirm_to_attend
            postModel['time_id'] = this.getModel().time_id
            this.api.confirm(postModel)
            .subscribe(res => {
                this.loader.dismissLoader()
                if (res) {
                    this.toast.present('Berhasil melakukan konfirmasi kehadiran.')
                    this.api.removeCache(this.getModel().id)
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