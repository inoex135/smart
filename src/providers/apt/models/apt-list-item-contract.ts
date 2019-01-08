import { PelayananContract } from "./pelayanan-contract";
import { PelayananSubContract } from "./pelayanan-sub-contract";

export interface AptListItemContract {
    getId(): number
    getStatusNorma(): string
    getNamaPemohon(): string
    getNomorTiket(): string
    getNomorSurat(): string
    getNormaSurat(): string
    getStatusString(): string
    getPelayanan(): PelayananContract
    getPelayananSub(): PelayananSubContract

    setId(id: number): void
    setStatusNorma(status: string): void
    setNamaPemohon(nama: string): void
    setNomorTiket(tiket: string): void
    setNomorSurat(noSurat: string): void
    setStatusString(status: string): void
    setPelayanan(pelayanan: PelayananContract): void
    setPelayananSub(pelayananSub: PelayananSubContract): void
}