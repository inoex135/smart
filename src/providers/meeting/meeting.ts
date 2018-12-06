import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";


@Injectable()
export class MeetingProvider {

    constructor(private api: ApiProvider) {}

    filterTime:Array<any> = [
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

    getMeetings(model:any) {
        return this.api.get(`/rapat?keyword=${model.keyword}&page=${model.page}&size=${model.size}&jenis_waktu=${model.type}`)
    }

    getDetailMeeting(model:any) {
        return this.api.get(`/rapat/agenda/me?keyword=${model.keyword}&page=${model.page}&size=${model.size}&jenis_waktu=arsip&tahun=&bulan=&unit=`)
    }

    confirm(model:any) {
        var data = {}
        data['konfirmasi_hadir'] = model.attend
        return this.api.post(`/agenda-waktu/${model.id}/konfirmasi`, model)
    }

}