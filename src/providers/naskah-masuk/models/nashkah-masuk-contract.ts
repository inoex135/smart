export interface NashkahMasukContract {

    getId(): number
    getCreatedDate(): string
    getNomorSurat(): string
    getPerihal(): string
    getColorClass(): string
    getTanggalSurat(): string
    getNamaUnit(): string
    getStatusSurat(): string
    getNamaPemohon(): string
    getPelayanan(): string
    getSubPelayanan(): string
    getNormaWaktu(): string

    setId(id: number): void
    setCreatedDate(date: string): void
    setNomorSurat(nomor: string): void
    setPerihal(perihal: string): void
    setTanggalSurat(tanggal: string): void
    setNamaUnit(nama: string): void
    setNamaPemohon(nama: string): void
    setPelayanan(pelayanan: string): void
    setSubPelayanan(sub: string): void
    setNormaWaktu(waktu: number): string
    setStatusSurat(status: string): void

}