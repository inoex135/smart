import { Component } from "@angular/core";
import { IonicPage, NavController, ModalOptions, Modal, ModalController } from "ionic-angular";
import { MeetingDetailAgendaPage } from "../meeting-agenda/meeting-detail-agenda";
import { MeetingProvider } from "../../providers/meeting/meeting";
import { LogUtil } from "../../utils/logutil";
import { ModalFilterMeetingPage } from "../modal-filter-meeting/modal-filter-meeting";

@Component({
    selector: "meeting-detail",
    templateUrl: "meeting-detail.html"
  })
@IonicPage()
export class MeetingDetailPage {

    static TAG:string = 'MeetingDetailPage'
    static KEY_MODEL:string = 'model'

    items:Array<any> = [
        {  
            "is_deleted":0,
            "id":883,
            "agenda":{  
               "is_deleted":0,
               "id":851,
               "nama_agenda":"tes",
               "created_by":"198604122007101001",
               "created_date":"2018-12-05T14:44:04.861+0700",
               "updated_by":"198604122007101001",
               "updated_date":"2018-12-06T10:26:06.172+0700",
               "rapat":{  
                  "is_deleted":0,
                  "id":882,
                  "nama":"tes",
                  "nomor_tiket":"R20183",
                  "jenis_rapat":1,
                  "status":0,
                  "naskah_undangan":null,
                  "tanggal_awal":"2018-12-05T14:44:04.000+0700",
                  "created_by":"198604122007101001",
                  "created_date":"2018-12-05T14:44:04.854+0700",
                  "updated_by":"198604122007101001",
                  "updated_date":"2018-12-06T10:26:06.171+0700",
                  "internal":true,
                  "status_name":"DRAFT"
               }
            },
            "ruang":{  
               "is_deleted":0,
               "id":428,
               "nama":"ruangan2",
               "kapasitas_peserta":100,
               "lingkungan":"DJKN",
               "tempat":"Lantai 200",
               "keterangan":null,
               "gedung":"lapangan",
               "unit":"050504",
               "fasilitas":"ok",
               "status":null,
               "created_by":"198604122007101001",
               "created_date":"2018-12-05T10:12:24.000+0700",
               "updated_by":null,
               "updated_date":null,
               "status_text":null
            },
            "tanggal":"06-12-2018",
            "jam_mulai":"00:45",
            "jam_akhir":"01:00",
            "ruang_eksternal":null,
            "jumlah_peserta":10,
            "keterangan":"tes catatan kosong",
            "catatan":null,
            "status":0,
            "notulen":null,
            "nama_notulen":null,
            "pimpinan_rapat":null,
            "nama_pimpinan":null,
            "tanggal_pesan":"2018-12-05T14:44:11.076+0700",
            "sekretaris":null,
            "nama_sekretaris":null,
            "status_rapat":null,
            "durasi":null
         },
         {  
            "is_deleted":0,
            "id":915,
            "agenda":{  
               "is_deleted":0,
               "id":883,
               "nama_agenda":"lorem ipsum",
               "created_by":"198604122007101001",
               "created_date":"2018-12-06T11:29:58.782+0700",
               "updated_by":"198604122007101001",
               "updated_date":"2018-12-06T12:46:29.764+0700",
               "rapat":{  
                  "is_deleted":0,
                  "id":914,
                  "nama":"lorem ipsum",
                  "nomor_tiket":"R201812",
                  "jenis_rapat":1,
                  "status":0,
                  "naskah_undangan":null,
                  "tanggal_awal":"2018-12-06T11:29:58.000+0700",
                  "created_by":"198604122007101001",
                  "created_date":"2018-12-06T11:29:58.781+0700",
                  "updated_by":"198604122007101001",
                  "updated_date":"2018-12-06T12:46:29.763+0700",
                  "internal":true,
                  "status_name":"DRAFT"
               }
            },
            "ruang":{  
               "is_deleted":0,
               "id":480,
               "nama":"Ruangan 411",
               "kapasitas_peserta":1,
               "lingkungan":null,
               "tempat":"jalan kaliurang",
               "keterangan":null,
               "gedung":"Aula",
               "unit":"050301",
               "fasilitas":"Lengkap",
               "status":null,
               "created_by":"198604122007101001",
               "created_date":"2018-12-06T11:49:39.000+0700",
               "updated_by":"198604122007101001",
               "updated_date":"2018-12-06T11:49:39.000+0700",
               "status_text":null
            },
            "tanggal":"06-12-2018",
            "jam_mulai":"00:45",
            "jam_akhir":"01:00",
            "ruang_eksternal":null,
            "jumlah_peserta":3,
            "keterangan":"tes catatan kosong",
            "catatan":null,
            "status":0,
            "notulen":"199211292014111001",
            "nama_notulen":"NOVARIDZ DIAN MULYANTO",
            "pimpinan_rapat":"199102022013101002",
            "nama_pimpinan":"NORMAN SURYA SIANIPAR",
            "tanggal_pesan":"2018-12-06T12:46:41.888+0700",
            "sekretaris":null,
            "nama_sekretaris":null,
            "status_rapat":3,
            "durasi":"00:00:38"
         }
    ]

    model:any = {
        keyword: '',
        page: 1,
        size: 10,
        type: 'today',
        year: 2018,
        month: 12,
        unit: ''
    }

    isInfiniteLoading:boolean = false

    constructor(private navCtrl: NavController, 
        private api: MeetingProvider,
        private modal: ModalController) {

    }

    ionViewWillEnter() {
        this.fillList()
    }

    private fillList() {
        this.api.getDetailMeeting(this.model)
        .subscribe(
            res => {
                if (res && res.content) {
                    this.items = res.content
                }
            },
            err => {

            }
        )
    }

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
        return this.items
    }

    private isItemExist(): boolean {
        return this.getItems().length > 0
    }

    private detail(model): void {
        var data = {}
        data[MeetingDetailAgendaPage.KEY_MODEL] = model
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

    clickFilter() {
        const myModalOptions: ModalOptions = {
          enableBackdropDismiss: false
        };
        const myModal: Modal = this.modal.create(ModalFilterMeetingPage.TAG, { filter: this.model }, myModalOptions);
        myModal.present();
        myModal.onDidDismiss(data => {
          if (data != null) {
            this.model = data
            this.updateList()
          }
        });
     
    }

}