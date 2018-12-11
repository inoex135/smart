import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { MasterPegawaiProvider } from "../../providers/master-pegawai/master-pegawai";
import { LoaderHelper } from "../../helpers/loader-helper";
import { LogUtil } from "../../utils/logutil";
import { AutoCompleteComponent } from "ionic2-auto-complete";
import { ToastHelper } from "../../helpers/toast-helper";

@Component({
    selector: "meeting-delegation",
    templateUrl: "meeting-delegation.html"
  })
@IonicPage()
export class MeetingDelegationPage {

    static TAG:string = 'MeetingDelegationPage'
    static KEY_MODEL:string = 'model'

    private model:any = {}

    private postModel:any = {
        id_agenda_waktu: '',
        catatan: '',
        peserta: []
    }

    @ViewChild("searchbar") searchbar: AutoCompleteComponent;

    private selaku:string = ''

    constructor(private navParams: NavParams, 
        private masterPegawai: MasterPegawaiProvider,
        private api: MeetingProvider,
        private loader: LoaderHelper,
        private navCtrl: NavController,
        private toast: ToastHelper) {
        this.model = this.navParams.get(MeetingDelegationPage.KEY_MODEL)
        if (this.model) {
            this.postModel['id_agenda_waktu'] = this.model.time_id
        }
    }

    private getPostModel(): any {
        return this.postModel
    }

    private getSelaku(): string {
        return this.selaku
    }

    private getParticipants(): Array<any> {
        return this.postModel.peserta
    }

    private removeParticipant(index:number): void {
        LogUtil.d(MeetingDelegationPage.TAG, 'remove by index: ' + index)
        if (this.getParticipants().length > 0) {
            this.getParticipants().splice(index, 1)
        }
    }

    private getSearchSelection(): any {
        return this.searchbar.getSelection()
    }

    private addParticipant(): void {
        var participant = this.getSearchSelection()
        LogUtil.d(MeetingDelegationPage.TAG, participant)
        if (participant) {
            var model:any = {}
            model['nip_tujuan'] = participant.nip
            model['selaku'] = this.getSelaku()
            model['nama_penerima'] = participant.nama
            model['jenis_tujuan'] = 'asli'
            this.postModel.peserta.push(model)
        }
        this.selaku = ''
        this.searchbar.clearValue()
    }

    private isAllowedToSave() {
        return this.postModel.peserta.length > 0 && this.postModel.id_agenda_waktu
    }

    private save() {
        LogUtil.d(MeetingDelegationPage.TAG, this.postModel)
        this.loader.show().then(() => {
            this.api.confirm(this.postModel)
            .subscribe(
                res => {
                    this.loader.dismissLoader()
                    if (res) {
                        this.navCtrl.pop()
                    } else {
                        this.toast.present('Terjadi kegagalan!')
                    }
                },
                err => {
                    this.loader.dismissLoader()
                    this.toast.present('Terjadi kegagalan!')
                }
            )
        })
    }

}