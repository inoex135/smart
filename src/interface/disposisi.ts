export interface IDisposisi {
  sumas_id: number;
  personal: Array<number> | number;
  selaku: string;
  sifat_surat: number;
  tanggal_selesai: Date; //dd-mm-YYY
  tanggal_disposisi: Date;
  catatan_disposisi: string;
  unit_030000?: number;
  is_lead_030000: number;
}
