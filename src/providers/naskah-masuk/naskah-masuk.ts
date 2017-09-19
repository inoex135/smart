import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class NaskahMasukProvider {
  constructor(public http: Http) {
    console.log("Hello NaskahMasukProvider Provider");
  }

  getDetailNaskah(item: any) {
    const detail = {
      identitasNaskah: {
        noAgendaPemberiDisposisi: "-",
        amplopTertutup: "Tidak",
        naskahPermohonan: "tidak",
        jenisPengiriman: "Langsung",
        tanggalTerima: "06 Juli 2017",
        jenisNaskah: "Undangan",
        nomor: "UND-137/KN.5/2017",
        tanggalNaskah: "06 Juli 2017",
        perihal: "Undangan Rapat Dialog Kinerja Organisasi Direktorat PKNSI",
        sifatNaskah: "Sangat Segera",
        sifatDisposisi: "-",
        sifatBerkas: "Asli",
        prosesNaskah: "Selesai"
      },
      pengirimNaskah: {}
    };
    return detail;
  }

  getNaskahMasuk() {
    const data = [
      {
        noNaskah: "UND-137/KN.5/2017",
        tanggal: "06 Juli 2017",
        perihal: "Undangan Rapat Dialog Kinerja Organisasi ",
        status: "Selesai",
        unit: "Direktorat Pengelolaan Kekayaan Negara Dan Sistem Informasi"
      },
      {
        noNaskah: "UND-137/KN.5/2017",
        tanggal: "06 Juli 2017",
        perihal: "Undangan Rapat Dialog Kinerja Organisasi ",
        status: "Selesai",
        unit: "Direktorat Pengelolaan Kekayaan Negara Dan Sistem Informasi"
      }
    ];
    return data;
  }
}
