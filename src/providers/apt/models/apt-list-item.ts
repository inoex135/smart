import { AptListItemContract } from "./contracts/apt-list-item-contract";
import { PelayananContract } from "./contracts/pelayanan-contract";
import { PelayananSubContract } from "./contracts/pelayanan-sub-contract";
import { PelayananModel } from "./pelayanan-model";
import { PelayananSubModel } from "./pelayanan-sub-model";

export class AptListItem implements AptListItemContract {

    private id: number
    private status_norma: string
    private nama_pemohon: string
    private nomor_tiket: string
    private nomor_surat: string
    private norma_surat: string
    private statusString: string
    private tanggal_string: string
    private norma_waktu: number
 
    private pelayanan: PelayananContract
    private pelayananSub: PelayananSubContract

    public static create(data: any): AptListItem {
        let model = new AptListItem()
        model.setId(data.id)
        model.setNamaPemohon(data.nama_pemohon)
        model.setStatusNorma(data.status_norma)
        model.setNomorTiket(data.nomor_tiket)
        model.setNomorSurat(data.nomor_surat)
        model.setStatusString(data.status_string)
        model.setTanggalString(data.tanggal_string)
        model.setNormaWaktu(data.norma_waktu)
        model.setPelayanan(PelayananModel.create(data.pelayanan))
        model.setPelayananSub(PelayananSubModel.create(data.pelayanan_sub))
        return model
    }

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

    getTanggalString(): string {
        return this.tanggal_string
    }
    
    getPelayanan(): PelayananContract {
        return this.pelayanan
    }
    
    getPelayananSub(): PelayananSubContract {
        return this.pelayananSub
    }

    isVerified(): boolean {
        return this.getStatusString() == 'Belum diverifikasi'
    }

    getNormaWaktu(): number {
        return this.norma_waktu
    }

    setId(id: number): void {
        this.id = id
    }
    
    setStatusNorma(status: string): void {
        this.status_norma = status
    }
    
    setNamaPemohon(nama: string): void {
        this.nama_pemohon = nama
    }
    
    setNomorTiket(tiket: string): void {
        this.nomor_tiket = tiket
    }
    
    setNomorSurat(noSurat: string): void {
        this.nomor_surat = noSurat
    }
    
    setStatusString(status: string): void {
        this.statusString = status
    }
    
    setPelayanan(pelayanan: PelayananContract): void {
        this.pelayanan = pelayanan
    }

    setPelayananSub(pelayananSub: PelayananSubContract): void {
        this.pelayananSub = pelayananSub
    }

    setTanggalString(tanggalString: string): void {
        this.tanggal_string = tanggalString
    }

    setNormaWaktu(waktu: number): void {
        this.norma_waktu = waktu
    }

    getStatusColor(): string {
        switch(this.getStatusNorma()) {
          case 'Permohonan Aktif':
            return 'new-green-background'
          case 'Permohonan Aktif Mendekati Batas Waktu':
            return 'new-orange-background'
          case 'Permohonan Melebih Batas Waktu':
            return 'new-red-background'
          default:
            return 'white-background'
        }
    }

}