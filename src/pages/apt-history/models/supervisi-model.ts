import { SupervisiContract } from "./contracts/supervisi-contract";
import { BaseModel } from "../../../models/base-model";

export class Supervisi extends BaseModel implements SupervisiContract {

    readonly catatan?: string   
    readonly tanggal?: string
    readonly status?: string
    readonly nama_supervisor?: string

    constructor(data:any) {
        super(data)
    }

    getCatatan(): string {
        return this.catatan
    }
    getTanggal(): string {
        return this.tanggal
    }
    getStatus(): string {
        return status
    }
    getNama(): string {
        return this.nama_supervisor
    }

    toString(): string {
        return 'catatan:' + this.getCatatan() + ';tanggal:' + this.tanggal
    }

}