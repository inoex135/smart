import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { ApiProvider } from "../api/api";

@Injectable()
export class NaskahMasukProvider {
  constructor(public http: Http, public api: ApiProvider) {}

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

  disposisi(dataNaskah: any) {
    const url = "/naskah";
    return this.api.post(url, dataNaskah).map(res => res.json());
  }

  teruskan(dataNaskah: any) {
    const url = "/naskah";

    return this.api.post(url, dataNaskah).map(res => res.json());
  }

  selesai(dataNaskah: any) {
    const url = "/naskah";

    return this.api.post(url, dataNaskah).map(res => res.json());
  }
}
