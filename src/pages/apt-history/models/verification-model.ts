import { VerifikasiContract } from "./contracts/verifikasi-contract";
import { BaseModel } from "../../../models/base-model";

export class Verification extends BaseModel implements VerifikasiContract {

    readonly tanggal_verifikasi?:string
    readonly surat_pendukung?:string
    readonly nama_verifikator?:string
    readonly status_verifikasi?:string
    readonly catatan_verifikasi?:string

    constructor(data:any) {
        super(data)
    }

    getTanggal(): string {
        return this.tanggal_verifikasi
    }

    getSuratPendukung(): string {
        return this.surat_pendukung
    }

    getNama(): string {
        return this.nama_verifikator
    }

    getStatus(): string {
        return this.status_verifikasi
    }

    getCatatan(): string {
        return this.catatan_verifikasi
    }

    toString():string {
        return 'tanggal:' + this.getTanggal()
    }

}