import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class NaskahDisposisiProvider {
  constructor(public apiProvider: ApiProvider) {}

  simpanDisposisi(data: any) {
    let formData = new FormData();
    formData.append("sumas_id", data.sumasId);
    formData.append("personal", data.personalId);
    formData.append("selaku", data.selaku);
    formData.append("sifat_surat", data.sifatSurat);
    formData.append("petunjuk", data.petunjuk);
    formData.append("tanggal_selesai", data.tanggalSelesai);
    formData.append("tanggal_disposisi", data.tanggalDisposisi);
    formData.append("catatan_disposisi", data);

    this.apiProvider.postForm("/surat/disposisi/create", formData).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
