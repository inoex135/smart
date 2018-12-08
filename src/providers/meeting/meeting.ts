import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../token/token";
import { fromPromise } from "rxjs/observable/fromPromise";
import { Observable } from "rxjs";
import { LogUtil } from "../../utils/logutil";


@Injectable()
export class MeetingProvider {

    static TAG:string = 'MeetingProvider'

    constructor(private api: ApiProvider, private token: TokenProvider) {}

    public filterTime:Array<any> = [
        {
            key: 'today',
            value: 'Hari ini'
        },
        {
            key: 'weekend',
            value: 'Akhir Pekan'
        },
        {
            key: 'arsip',
            value: 'Arsip'
        }
    ]

    public getFilterTime(): Array<any> {
        return this.filterTime
    }

    public getMeetings(model:any) {
        return this.api.get(`/rapat?keyword=${model.keyword}&page=${model.page}&size=${model.size}&jenis_waktu=${model.type}`)
    }

    public getDetailMeeting(id:any) {
        var resource = Observable.zip(this.api.get(`/rapat/${id}`), fromPromise(this.token.getCurrentProfile()))
        return resource.map(([result, profile]) => {
            LogUtil.d(MeetingProvider.TAG, profile)
            if (result && result.agenda) {
                result['new_list'] = []
                result.agenda.forEach(element => {
                    if (element.waktu.length > 0) {
                        element.waktu.forEach(time => {
                            var model:any = {}
                            model['agenda_id'] = element.id
                            model['agenda_name'] = element.nama_agenda
                            model['time_id'] = time.id
                            model['place'] = time.ruang_eksternal
                            if (model['place'] === '' || model['place'] === null || model['place'] === undefined) {
                                model['place'] = time.ruang
                            }
                            model['date'] = time.tanggal
                            model['start_time'] = time.jam_mulai
                            model['finish_time'] = time.jam_akhir
                            model['total_participant'] = time.peserta.length
                            model['confirm_to_attend'] = false
                            model['allow_participant_confirmation'] = false
                            if (time.peserta.length > 0) {
                                time.peserta.forEach(peserta => {
                                    if (peserta.nip_tujuan === profile.nip) {
                                        model['allow_participant_confirmation'] = true
                                    }
                                    model['confirm_to_attend'] = peserta.konfirmasi_hadir
                                })
                            }
                            result['new_list'].push(model)
                        })
                    }
                })
            }
            return result
        })
    }

    public getDetailMeetings(model:any) {
        return this.api.get(`/rapat/agenda/me?keyword=${model.keyword}&page=${model.page}&size=${model.size}&jenis_waktu=${model.type}&tahun=${model.year}&bulan=${model.month}&unit=`)
    }

    public getFiles(timeId:any) {
        return this.api.get(`/agenda-waktu/${timeId}/dokumen`)
    }

    public deleteFile(model:any) {
        return this.api.get(`/agenda-waktu/${model.timeId}/dokumen/${model.fileId}`)
    }

    public downloadFile(model:any) {
        return this.api.get(`/api/agenda-waktu/${model.timeId}/dokumen/${model.fileId}/download`)
    }

    public confirm(model:any) {
        var data = {}
        data['konfirmasi_hadir'] = model.attend
        return this.api.post(`/agenda-waktu/${model.id}/konfirmasi`, model)
    }

}