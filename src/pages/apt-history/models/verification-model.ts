import { VerifikasiContract } from "./contracts/verifikasi-contract";
import { BaseModel } from "../../../models/base-model";

export class Verification extends BaseModel implements VerifikasiContract {

    private readonly tanggal_verifikasi?:string
    private readonly surat_pendukung?:string
    private readonly nama_verifikator?:string
    private readonly status_verifikasi?:string
    private readonly catatan_verifikasi?:string

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