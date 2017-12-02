import { Injectable } from "@angular/core";

import { ApiProvider } from "../api/api";

@Injectable()
export class PersonalAgendaDetailProvider {
  constructor(private api: ApiProvider) {}

  // untuk personal -> view agenda -> view detail
  getDetailAgenda(params?: any) {
    return this.api.get(`/personal/calendar?start=${params}&end=${params}`);
  }

  // update agenda
  update(agendaId: number, params: any) {
    let formData = new FormData();
    const unit = params.unit.map(res => {
      return res.kode_utuh;
    });

    const pegawai = params.pegawai.map(res => {
      return res.nip;
    });

    formData.append("tanggal_mulai", params.tanggal_mulai);
    formData.append("tanggal_akhir", params.tanggal_akhir);
    formData.append("jam_mulai", params.waktu_mulai);
    formData.append("jam_akhir", params.waktu_akhir);
    formData.append("uraian", params.uraian);
    formData.append("lokasi", params.lokasi);
    formData.append("unit", unit);
    formData.append("pegawai", pegawai);

    return this.api.postForm(`/personal/agenda/update/${agendaId}`, formData);
  }

  //hapus agenda
  delete(agendaId: number) {
    return this.api.get(`/personal/agenda/delete/${agendaId}`);
  }

  edit(agendaId: number) {
    return this.api.get(`/personal/agenda/edit/${agendaId}`);
  }
}
