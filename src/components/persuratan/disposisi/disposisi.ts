import { Component } from "@angular/core";
import { PetunjukDisposisi } from "../../../constant/petunjuk-disposisi";
import { Jabatan } from "../../../constant/jabatan";

@Component({
  selector: "disposisi",
  templateUrl: "disposisi.html"
})
export class Disposisi {
  datas: any = {};
  tanggalDisposisi: string = new Date().toISOString();
  constructor() {
    this.datas.petunjuk = PetunjukDisposisi.getPetunjuk();
    this.datas.jabatan = Jabatan.getJabatan();
    console.log(this.datas);
  }
}
