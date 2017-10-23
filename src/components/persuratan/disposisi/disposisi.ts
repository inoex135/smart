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
  selectedUnit: Array<any> = [];
  lead: Array<string> = [];

  constructor() {
    this.datas.petunjuk = PetunjukDisposisi.getPetunjuk();
    this.datas.jabatan = Jabatan.getJabatan();
  }

  setLead(event: any, unit: any) {
    // @TODO: selectedUnit msh duplikat
    // jika checkbox di select setelah itu di uncheck,
    // kemudian di cheklist lagi
    if (event.checked) {
      this.selectedUnit.push(unit);
    }
  }
  simpan() {
    alert(this.unit);
  }
}
