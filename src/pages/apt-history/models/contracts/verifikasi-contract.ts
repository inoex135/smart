export interface VerifikasiContract {
    getTanggal(): string
    getSuratPendukung(): string
    getNama(): string
    getStatus(): string
    getCatatan(): string
    toString(): string
}