import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { CacheProvider } from "../cache/cache";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { TokenProvider } from "../token/token";
import { LogUtil } from "../../utils/logutil";

@Injectable()
export class NaskahDisposisiProvider {

  static TAG:string = 'NaskahDisposisiProvider'

  private KEY_UNIT:string = 'uPj3xYLd8esUVfE_'
  private KEY_SURAT:string = 'do3Yi5cNdMLwNdb_'
  private KEY_SIFAT:string = 'e02POEjBrQYouv3_'
  private KEY_PELAKSANA:string = 'ffvufK9BW25EoX5_'

  constructor(public api: ApiProvider, private token: TokenProvider, private cache: CacheProvider) {}
  // search pegawai/user
  searchPegawai(params: any) {
    return this.api.get(`/master/pegawai/search?nama=${params}&nip=${params}`);
  }

  // get unit disposisi di page disposisi
  getUnitDisposisi() {
    return this.getData(this.KEY_UNIT, this.api.get("/master/unit/disposisi"))
  }

  // get petunjuk surat untuk disposisi
  getPetunjuk() {
    return this.getData(this.KEY_SURAT, this.api.get("/master/petunjuk-surat/disposisi"))
  }

  private getCache(key:string):Promise<any> {
    return this.token.getCurrentProfile()
    .then(profile => {
      let cacheKey = key + profile.nip
      return Promise.all([this.cache.get(cacheKey), cacheKey as string])
    })
  }

  getData(key:string, request:Observable<any>) {
    return Observable.fromPromise(this.getCache(key))
    .mergeMap(([data, cacheKey]) => {
      LogUtil.d(NaskahDisposisiProvider.TAG, data)
      if (data == null) {
        return request.map(res => {
          if (res) {
            this.cache.put(cacheKey, {when: Date.now() + CacheProvider.FIVE_MINUTES, response: res})
          }
          return res
        })
      }
      return of(data.response)
    })
  }

  // get petunjuk surat untuk disposisi
  getSifatSurat() {
    return this.getData(this.KEY_SIFAT, this.api.get("/master/sifat-surat/disposisi"))
  }

  getPelaksana() {
    return this.getData(this.KEY_PELAKSANA, this.api.get("/master/pegawai/pelaksana"))
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
