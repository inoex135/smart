import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { ENV } from "../../config/environment";
import { TokenProvider } from "../token/token";
import { fromPromise } from "rxjs/observable/fromPromise";
import { Observable } from "rxjs";
import { LogUtil } from "../../utils/logutil";
import { of } from "rxjs/observable/of";


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

    dummyDetail:any = {  
        "is_deleted":0,
        "id":915,
        "nama":"Tes perihal",
        "nomor_tiket":"RE20183",
        "jenis_rapat":2,
        "status":0,
        "naskah_undangan":"UAT E-Rapat",
        "tanggal_awal":"2018-12-07T00:00:00.000+0700",
        "created_by":"198604122007101001",
        "created_date":"2018-12-06T11:43:49.514+0700",
        "updated_by":null,
        "updated_date":null,
        "agenda":[  
           {  
              "is_deleted":0,
              "id":884,
              "nama_agenda":"UAT Hari ke-1",
              "created_by":"198604122007101001",
              "created_date":"2018-12-06T11:43:49.515+0700",
              "updated_by":null,
              "updated_date":null,
              "waktu":[  
                 {  
                    "is_deleted":0,
                    "id":916,
                    "ruang":null,
                    "tanggal":"07-12-2018",
                    "jam_mulai":"08:00",
                    "jam_akhir":"10:30",
                    "ruang_eksternal":"Hotel A",
                    "jumlah_peserta":null,
                    "keterangan":null,
                    "catatan":null,
                    "status":null,
                    "notulen":null,
                    "nama_notulen":null,
                    "pimpinan_rapat":null,
                    "nama_pimpinan":null,
                    "tanggal_pesan":null,
                    "sekretaris":null,
                    "nama_sekretaris":null,
                    "status_rapat":null,
                    "durasi":null,
                    "pic":[  
     
                    ],
                    "peserta":[  
                       {  
                          "is_deleted":0,
                          "id":1145,
                          "nip_tujuan":null,
                          "kode_unit_tujuan":null,
                          "nama_unit_tujuan":null,
                          "selaku":null,
                          "jenis_tujuan":"salinan",
                          "tipe_tujuan":"personal",
                          "asal_tujuan":1,
                          "nama_penerima":null,
                          "jabatan":null,
                          "alamat":null,
                          "telepon":null,
                          "email":null,
                          "jenis_eselon":null,
                          "perusahaan":null,
                          "absensi":null,
                          "keluar":null,
                          "jam_mulai":null,
                          "jam_akhir":null,
                          "konfirmasi_hadir":null,
                          "keterangan":null
                       },
                       {  
                          "is_deleted":0,
                          "id":1143,
                          "nip_tujuan":"198611162015021002",
                          "kode_unit_tujuan":null,
                          "nama_unit_tujuan":null,
                          "selaku":"Pelaksana",
                          "jenis_tujuan":"asli",
                          "tipe_tujuan":"personal",
                          "asal_tujuan":1,
                          "nama_penerima":"NORMANSYAH",
                          "jabatan":null,
                          "alamat":null,
                          "telepon":null,
                          "email":null,
                          "jenis_eselon":null,
                          "perusahaan":null,
                          "absensi":null,
                          "keluar":null,
                          "jam_mulai":null,
                          "jam_akhir":null,
                          "konfirmasi_hadir":null,
                          "keterangan":null
                       },
                       {  
                          "is_deleted":0,
                          "id":1144,
                          "nip_tujuan":null,
                          "kode_unit_tujuan":null,
                          "nama_unit_tujuan":null,
                          "selaku":null,
                          "jenis_tujuan":"tembusan",
                          "tipe_tujuan":"personal",
                          "asal_tujuan":1,
                          "nama_penerima":null,
                          "jabatan":null,
                          "alamat":null,
                          "telepon":null,
                          "email":null,
                          "jenis_eselon":null,
                          "perusahaan":null,
                          "absensi":null,
                          "keluar":null,
                          "jam_mulai":null,
                          "jam_akhir":null,
                          "konfirmasi_hadir":null,
                          "keterangan":null
                       }
                    ]
                 },
                 {  
                    "is_deleted":0,
                    "id":917,
                    "ruang":null,
                    "tanggal":"08-12-2018",
                    "jam_mulai":"08:00",
                    "jam_akhir":"10:00",
                    "ruang_eksternal":"Ruang B",
                    "jumlah_peserta":null,
                    "keterangan":null,
                    "catatan":null,
                    "status":null,
                    "notulen":null,
                    "nama_notulen":null,
                    "pimpinan_rapat":null,
                    "nama_pimpinan":null,
                    "tanggal_pesan":null,
                    "sekretaris":null,
                    "nama_sekretaris":null,
                    "status_rapat":null,
                    "durasi":null,
                    "pic":[  
     
                    ],
                    "peserta":[  
                       {  
                          "is_deleted":0,
                          "id":1148,
                          "nip_tujuan":null,
                          "kode_unit_tujuan":null,
                          "nama_unit_tujuan":null,
                          "selaku":null,
                          "jenis_tujuan":"salinan",
                          "tipe_tujuan":"personal",
                          "asal_tujuan":1,
                          "nama_penerima":null,
                          "jabatan":null,
                          "alamat":null,
                          "telepon":null,
                          "email":null,
                          "jenis_eselon":null,
                          "perusahaan":null,
                          "absensi":null,
                          "keluar":null,
                          "jam_mulai":null,
                          "jam_akhir":null,
                          "konfirmasi_hadir":null,
                          "keterangan":null
                       },
                       {  
                          "is_deleted":0,
                          "id":1147,
                          "nip_tujuan":"197611132000011001",
                          "kode_unit_tujuan":null,
                          "nama_unit_tujuan":null,
                          "selaku":"Kepala Seksi Pengelolaan Kekayaan Negara I",
                          "jenis_tujuan":"tembusan",
                          "tipe_tujuan":"personal",
                          "asal_tujuan":1,
                          "nama_penerima":"NOVIAN FATCKUR ROCHMAN",
                          "jabatan":null,
                          "alamat":null,
                          "telepon":null,
                          "email":null,
                          "jenis_eselon":null,
                          "perusahaan":null,
                          "absensi":null,
                          "keluar":null,
                          "jam_mulai":null,
                          "jam_akhir":null,
                          "konfirmasi_hadir":null,
                          "keterangan":null
                       },
                       {  
                          "is_deleted":0,
                          "id":1146,
                          "nip_tujuan":"199111182015022003",
                          "kode_unit_tujuan":null,
                          "nama_unit_tujuan":null,
                          "selaku":"Pelaksana",
                          "jenis_tujuan":"asli",
                          "tipe_tujuan":"personal",
                          "asal_tujuan":1,
                          "nama_penerima":"NOVERVA PRADINA PRAMESTI",
                          "jabatan":null,
                          "alamat":null,
                          "telepon":null,
                          "email":null,
                          "jenis_eselon":null,
                          "perusahaan":null,
                          "absensi":null,
                          "keluar":null,
                          "jam_mulai":null,
                          "jam_akhir":null,
                          "konfirmasi_hadir":null,
                          "keterangan":null
                       }
                    ]
                 }
              ]
           }
        ],
        "status_name":"DRAFT",
        "internal":false
     }

    public getFilterTime(): Array<any> {
        return this.filterTime
    }

    public getMeetings(model:any) {
        return this.api.get(`/rapat?keyword=${model.keyword}&page=${model.page}&size=${model.size}&jenis_waktu=${model.type}`)
    }

    public getDetailMeeting(id:any) {
        var resource = this.api.get(`/rapat/${id}`)
        if (ENV.API_URL) {
            resource = of(this.dummyDetail)
        }
        return Observable.zip(resource, fromPromise(this.token.getCurrentProfile()))
        .map(([result, profile]) => {
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