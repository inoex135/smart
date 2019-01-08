import { AptListItemContract } from "./apt-list-item-contract";
import { PelayananContract } from "./pelayanan-contract";
import { PelayananSubContract } from "./pelayanan-sub-contract";

export class AptListItem implements AptListItemContract {

    private id: number
    private status_norma: string
    private nama_pemohon: string
    private nomor_tiket: string
    private nomor_surat: string
    private norma_surat: string
    private statusString: string
    private pelayanan: PelayananContract
    private pelayananSub: PelayananSubContract

    getId(): number {
        return this.id
    }    
    getStatusNorma(): string {
        return this.status_norma
    }
    getNamaPemohon(): string {
        return this.nama_pemohon
    }
    getNomorTiket(): string {
        return this.nomor_tiket
    }
    getNomorSurat(): string {
        return this.nomor_surat
    }
    getNormaSurat(): string {
        return this.norma_surat
    }
    getStatusString(): string {
        return this.statusString
    }
    getPelayanan(): PelayananContract {
        return this.pelayanan
    }

    setId(id: number): void {
        throw new Error("Method not implemented.");
    }
    setStatusNorma(status: string): void {
        throw new Error("Method not implemented.");
    }
    setNamaPemohon(nama: string): void {
        throw new Error("Method not implemented.");
    }
    setNomorTiket(tiket: string): void {
        throw new Error("Method not implemented.");
    }
    setNomorSurat(noSurat: string): void {
        throw new Error("Method not implemented.");
    }
    setStatusString(status: string): void {
        throw new Error("Method not implemented.");
    }
    setPelayanan(pelayanan: PelayananContract): void {
        this.pelayanan = pelayanan
    }

    getPelayananSub(): PelayananSubContract {
        return this.pelayananSub
    }
    setPelayananSub(pelayananSub: PelayananSubContract): void {
        this.pelayananSub = pelayananSub
    }


}