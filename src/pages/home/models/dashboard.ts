import { DashboardContract } from "./dashboard-contract";
import { Notice } from "./notice";

export class Dashboard implements DashboardContract {

    private readonly CT?: number
    private readonly jam_masuk_hari_ini?: string
    private readonly DL?: number
    private readonly hari_kerja?: number
    private readonly akumulasi_absen: string
    private readonly jumlah_hari_masuk?: number
    private readonly jam_keluar_hari_ini?: string
    private readonly jam_masuk_kemarin?: string
    private readonly jam_keluar_kemarin?: string
    private pengumuman?: Notice[]

    getPresentAccumulation(): string {
        if (this.jumlah_hari_masuk 
            && this.hari_kerja
            && this.jumlah_hari_masuk > 0
            && this.hari_kerja > 0
        ) {
          let percent = (this.jumlah_hari_masuk / this.hari_kerja) * 100
          return percent.toFixed(0) + "%"
        }
        return "-"
    }

    getAbsence(): string {
        return this.akumulasi_absen
    }

    getTodayCheckIn(): string {
        return this.jam_masuk_hari_ini
    }

    getTodayCheckOut(): string {
        return this.jam_keluar_hari_ini
    }

    getYesterdayCheckIn(): string {
        return this.jam_masuk_kemarin
    }

    getYesterdayCheckOut(): string {
        return this.jam_keluar_kemarin
    }

    getNotices(): Notice[] {
        return this.pengumuman
    }

    setNotices(notices: Notice[]): void {
        if (this.pengumuman == undefined || this.pengumuman == null) {
            this.pengumuman = Array<Notice>()
        }
        if (notices.length) {
            notices.forEach(element => {
                this.pengumuman.push(element)
            })
        }
    }

}