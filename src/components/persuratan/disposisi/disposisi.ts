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

  disposisi: any = {
    sifatSurat: "",
    catatan: "",
    targetSelesai: "",
    tanggal: "",
    petunjuk: []
  };

  constructor() {
    this.datas.petunjuk = PetunjukDisposisi.getPetunjuk();
    this.datas.jabatan = Jabatan.getJabatan();
  }

  onChange(petunjuk: string, checked: boolean, id: number) {
    // console.log(petunjuk, checked, id);
    if (checked) {
      this.disposisi.petunjuk.push({
        petunjuk: petunjuk,
        id: id,
        checked: checked
      });
    } else {
      this.disposisi.petunjuk.splice(id);
    }

    console.log(this.disposisi);
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
    alert("sukses");
    console.log(this.disposisi);
  }
}
