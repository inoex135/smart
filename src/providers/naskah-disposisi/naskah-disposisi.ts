import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class NaskahDisposisiProvider {
  constructor(public api: ApiProvider) {}
  // search pegawai/user
  searchPegawai(params: any) {
    return this.api.get(`/master/pegawai/search?nama=${params}&nip=${params}`);
  }

  // get unit disposisi di page disposisi
  getUnitDisposisi() {
    return this.api.get("/master/unit/disposisi");
  }

  // get petunjuk surat untuk disposisi
  getPetunjuk() {
    return this.api.get("/master/petunjuk-surat/disposisi");
  }

  // get petunjuk surat untuk disposisi
  getSifatSurat() {
    return this.api.get("/master/sifat-surat/disposisi");
  }

  getPelaksana() {
    return this.api.get("/master/pegawai/pelaksana");
  }
  simpanDisposisi(data: any) {
    const unitTujuan = data.unitTujuan.map(res => {
      return res.kode_utuh;
    });

    const personal = data.personal.map(
      res => {
        return res.nip;
      },
      err => {
        return null;
      }
    );

    let formData = new FormData();

    //disposisi personal, form unit tidak perlu dikirim
    if (unitTujuan.length > 0) {
      formData.append("unit", unitTujuan);
    }

    formData.append("sumas_id", data.sumasId);
    formData.append("personal", personal);
    formData.append("selaku", data.selaku);
    formData.append("sifat_surat", data.sifatSurat);
    formData.append("petunjuk", data.petunjuk);
    formData.append("tanggal_selesai", data.tanggalSelesai);
    formData.append("tanggal_disposisi", data.tanggalDisposisi);
    formData.append("catatan_disposisi", data.catatan);

    formData.append("lead", data.leader);

    return this.api.postForm("/surat/disposisi/create", formData);
  }
}
