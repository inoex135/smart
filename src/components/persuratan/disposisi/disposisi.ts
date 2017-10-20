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
  unit: Array<string> = [];
  selectedUnit: any = "";
  lead: Array<string> = [];

  constructor() {
    this.datas.petunjuk = PetunjukDisposisi.getPetunjuk();
    this.datas.jabatan = Jabatan.getJabatan();
  }

  setLead(data) {
    console.log(data);
  }
  simpan() {
    alert(this.unit);
  }
}
