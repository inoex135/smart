import { NashkahMasukContract } from "./nashkah-masuk-contract";

export class NaskahMasukItem implements NashkahMasukContract {


    private id: number
    private created_date: string
    private nomor_surat: string
    private perihal: string
    private tanggal_surat: string
    private nama_unit: string
    private status_surat: string
    private nama_pemothon: string
    private pelayanan: string
    private sub_pelayanan: string
    
    getId(): number {
        return this.id
    }
    getCreatedDate(): string {
        return this.created_date
    }    
    getNomorSurat(): string {
        return this.nomor_surat
    }
    getPerihal(): string {
        return this.perihal
    }
    getColorClass(): string {
        if (this.getStatusSurat().includes('Disposisi')) {
            return '#ffb600'
        } else if (this.getStatusSurat().includes('Belum Proses')) {
            return '#d62222'
        } else if (this.getStatusSurat().includes('Teruskan')) {
            return '#1cb3ff'
        } else if (this.getStatusSurat().includes('Selesai')) {
            return '#26b459'
        }
        return 'default' 
    }
    getTanggalSurat(): string {
        return this.tanggal_surat
    }
    getNamaUnit(): string {
        return this.nama_unit
    }
    getStatusSurat(): string {
        return this.status_surat
    }
    getNamaPemohon(): string {
        return this.nama_pemothon
    }
    getPelayanan(): string {
        return this.pelayanan
    }
    getSubPelayanan(): string {
        return this.sub_pelayanan 
    }
    getNormaWaktu(): string {
        throw new Error("Method not implemented.");
    }
    setCreatedDate(date: string): void {
        throw new Error("Method not implemented.");
    }
    setNomorSurat(nomor: string): void {
        throw new Error("Method not implemented.");
    }
    setPerihal(perihal: string): void {
        throw new Error("Method not implemented.");
    }
    setTanggalSurat(tanggal: string): void {
        throw new Error("Method not implemented.");
    }
    setNamaUnit(nama: string): void {
        throw new Error("Method not implemented.");
    }
    setNamaPemohon(nama: string): void {
        throw new Error("Method not implemented.");
    }
    setPelayanan(pelayanan: string): void {
        throw new Error("Method not implemented.");
    }
    setSubPelayanan(sub: string): void {
        throw new Error("Method not implemented.");
    }
    setNormaWaktu(waktu: number): string {
        throw new Error("Method not implemented.");
    }
    
    setId(id: number): void {
        throw new Error("Method not implemented.");
    }

    setStatusSurat(status: string): void {
        throw new Error("Method not implemented.");
    }
    


}