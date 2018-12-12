import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { TokenProvider } from "../token/token";
import { fromPromise } from "rxjs/observable/fromPromise";
import { Observable } from "rxjs";
import { LogUtil } from "../../utils/logutil";
import { ENV } from "../../config/environment";
import { CacheProvider } from "../cache/cache";
import { of } from "rxjs/observable/of";


@Injectable()
export class MeetingProvider {

    static TAG:string = 'MeetingProvider'
    static CACHE_KEY:string = 'JhdjVIBfh26y9kIM_'

    constructor(private api: ApiProvider, private cache: CacheProvider, private token: TokenProvider) {}

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

    private getDetailCache(id:any): Promise<any> {
        return this.token.getCurrentProfile()
        .then(profile => {
            let key = MeetingProvider.CACHE_KEY + profile.nip + '_' + id
            return Promise.all([this.cache.get(key), profile, key])
        })
    }

    public getDetailMeeting(id:any) {
        //var resource = 
        return Observable.fromPromise(this.getDetailCache(id))
        .mergeMap(([data, profile, key]) => {
            LogUtil.d(MeetingProvider.TAG, profile)
            if (data == null) {
                return this.executeDetailRequest(id, profile)
            }
            return of(data.response)
        })
    }

    private executeDetailRequest(id, profile) {
        return this.api.get(`/rapat/${id}`)
        .map(result => {
            var arr = []
            result.agenda.forEach(element => {
                if (element.waktu.length > 0) {
                    element.waktu.forEach(time => {
                        var model:any = {}
                        model['agenda_id'] = element.id
                        model['agenda_name'] = element.nama_agenda
                        model['time_id'] = time.id
                        model['place'] = {}
                        if (time.ruang) {
                            model['place']['room'] = time.ruang.nama
                            model['place']['building'] = time.ruang.gedung
                        }
                        if (time.ruang_eksternal) {
                            model['place']['room'] = time.ruang_eksternal
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
                                    model['confirm_to_attend'] = peserta.konfirmasi_hadir
                                }
                            })
                        }
                        arr.push(model)
                    })
                }
            })
          //  if (arr.length) {
            //    this.cache.put(key, {when: Date.now() + CacheProvider.FIVE_MINUTES, response: arr})
           // }
            return arr
        })
    }

    public getDetailAgenda(model:any) {
        return this.api.get(`/agenda-rapat/${model.id}/waktu/${model.time_id}`)
    }

    public getDetailMeetings(model:any) {
        return this.api.get(`/rapat/agenda/me?keyword=${model.keyword}&page=${model.page}&size=${model.size}&jenis_waktu=${model.type}&tahun=${model.year}&bulan=${model.month}&unit=`)
    }

    public getFiles(timeId:any) {
        return this.api.get(`/agenda-waktu/${timeId}/dokumen`)
    }

    public deleteFile(model:any) {
        return this.api.get(`/agenda-waktu/${model.time_id}/dokumen/${model.file_id}`)
    }

    public downloadFile(model:any): string {
        return `${ENV.API_URL}/agenda-waktu/${model.time_id}/dokumen/${model.file_id}/download`
    }

    public confirm(model:any) {
        var data = {}
        data['konfirmasi_hadir'] = model.confirm_to_attend
        return this.api.post(`/agenda-waktu/${model.time_id}/konfirmasi`, model)
    }

}