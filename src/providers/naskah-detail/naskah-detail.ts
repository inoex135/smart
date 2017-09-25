import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class NaskahDetailProvider {
  constructor(public http: Http) {}
  getDetailNaskah() {
    const data = {
      noAgenda: "AHA-1231-MMT",
      noNaskah: "UND-137/KN.5/2017",
      tanggalNaskah: "06 Juli 2017",
      perihal: "Undangan Rapat Dialog Kinerja Organisasi Direktorat PKNSI",
      unitPengirim:
        "Direktorat Pengelolaan Kekayaan Negara Dan Sistem Informasi",
      statusSurat: "Asli",
      naskahDiterima: "Belum"
    };
    return data;
  }
}
