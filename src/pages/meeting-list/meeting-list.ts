import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { MeetingDetailPage } from "../meeting-detail/meeting-detail";
import { NotificationProvider } from "../../providers/notification/notification";

@Component({
    selector: "meeting-list-page",
    templateUrl: "meeting-list.html"
  })
@IonicPage()
export class MeetingListPage {

    static TAG:string = 'MeetingListPage'

    items:Array<any> = [
        {  
            "is_deleted":0,
            "id":862,
            "agenda":{  
               "is_deleted":0,
               "id":812,
               "nama_agenda":"UAT Hari 2",
               "created_by":"198604122007101001",
               "created_date":"2018-12-04T19:53:11.064+0700",
               "updated_by":null,
               "updated_date":null,
               "rapat":{  
                  "is_deleted":0,
                  "id":842,
                  "nama":"Regresi UAT SMARt",
                  "nomor_tiket":"R20182",
                  "jenis_rapat":1,
                  "status":0,
                  "naskah_undangan":null,
                  "tanggal_awal":"2018-12-04T19:53:11.000+0700",
                  "created_by":"198604122007101001",
                  "created_date":"2018-12-04T19:53:11.036+0700",
                  "updated_by":null,
                  "updated_date":null,
                  "internal":true,
                  "status_name":"DRAFT"
               }
            },
            "ruang":{  
               "is_deleted":0,
               "id":388,
               "nama":"ruangan5",
               "kapasitas_peserta":100,
               "lingkungan":"DJKN",
               "tempat":"Lantai 200",
               "keterangan":null,
               "gedung":"lapangan",
               "unit":"050504",
               "fasilitas":"ok",
               "status":null,
               "created_by":"197501221995031001",
               "created_date":"2018-12-02T22:45:15.000+0700",
               "updated_by":null,
               "updated_date":null,
               "status_text":null
            },
            "tanggal":"05-12-2018",
            "jam_mulai":"08:00",
            "jam_akhir":"10:00",
            "ruang_eksternal":null,
            "jumlah_peserta":5,
            "keterangan":null,
            "catatan":null,
            "status":0,
            "notulen":"196811181996031001",
            "nama_notulen":"NOVERA BONA PUTRA",
            "pimpinan_rapat":null,
            "nama_pimpinan":null,
            "tanggal_pesan":"2018-12-04T19:53:45.555+0700",
            "sekretaris":null,
            "nama_sekretaris":null,
            "status_rapat":null,
            "durasi":null
         }
    ]

    constructor(private navCtrl:NavController) {

    }

    ionViewWillEnter() {
        if (this.isItemExist()) {
            this.items = []
        }
    } 

    private getItems(): Array<any> {
        return this.items
    }

    detail(model: any): void {
        var data = {}
        data[MeetingDetailPage.KEY_MODEL] = model
        this.navCtrl.push(MeetingDetailPage.TAG, data)
    }

    private isItemExist(): boolean {
        return this.getItems().length > 0
    }

    private getNotificationType(): string {
        return NotificationProvider.TYPE_RAPAT
    }

}