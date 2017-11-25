import { Component } from "@angular/core";
import { PetunjukDisposisi } from "../../../constant/petunjuk-disposisi";
import { NaskahDisposisiProvider } from "../../../providers/naskah-disposisi/naskah-disposisi";
import { Observable } from "rxjs/Observable";
import { IDisposisiUnit } from "../../../interface/disposisi-unit";

import * as _ from "lodash";
// import remove from "lodash/remove";
@Component({
  selector: "disposisi",
  templateUrl: "disposisi.html"
})
export class Disposisi {
  datas: any = {};
  tanggalDisposisi: string = new Date().toISOString();
  unit: Array<any> = [];
  selectedUnit: Array<any> = [];
  lead: Array<string> = [];

  disposisi: any = {
    sifatSurat: "",
    catatan: "",
    targetSelesai: "",
    tanggal: "",
    petunjuk: []
  };

  disposisiAs: string = "";

  readonly selectAs: any = {
    unit: "UNIT",
    personal: "PERSONAL"
  };

  component: any = {
    unitOrPersonal: true,
    disposisiUnit: false,
    disposisiPersonal: false,
    disposisiSifat: false,
    disposisiPetunjuk: false,
    disposisiTanggal: false
  };

  constructor(private disposisiProvider: NaskahDisposisiProvider) {
    this.init();
  }

  init() {
    const petunjuk = this.disposisiProvider.getPetunjuk();
    const unitDisposisi = this.disposisiProvider.getUnitDisposisi();
    const sifatSurat = this.disposisiProvider.getSifatSurat();

    Observable.zip(petunjuk, unitDisposisi, sifatSurat).subscribe(
      ([petunjuk, unitDisposisi, sifatSurat]) => {
        this.datas.jabatan = unitDisposisi;
        this.datas.petunjuk = petunjuk;
        this.datas.sifatSurat = sifatSurat;
      }
    );
  }
  // CHECKBOX
  // untuk get dan remove value checkbox unit
  // remove by index dari unit yg di klik
  // dan add by index yang di klik
  selectUnit(unit: IDisposisiUnit, checked: boolean) {
    let unitIndex = this.selectedUnit.indexOf(unit);

    if (unitIndex !== -1) {
      this.selectedUnit.splice(unitIndex, 1);
    } else {
      this.selectedUnit.push(unit);
    }
  }
  onChange(petunjuk: string, checked: boolean, id: number) {
    if (checked) {
      this.disposisi.petunjuk.push({
        petunjuk: petunjuk,
        id: id,
        checked: checked
      });
    } else {
      this.disposisi.petunjuk.splice(id, 1);
    }
  }
  setLead(event: any, unit: any) {
    // @TODO: selectedUnit msh duplikat
    // jika checkbox di select setelah itu di uncheck,
    // kemudian di cheklist lagi
    if (event.checked) {
      this.selectedUnit.push(unit);
    }
  }

  nextStep(to: string = "root") {
    if (to === this.selectAs.unit) {
      this.component.unitOrPersonal = false;
      this.component.disposisiUnit = true;
    }

    if (to === this.selectAs.personal) {
      this.component.disposisiPersonal = true;
      this.component.unitOrPersonal = false;
    }

    if (to === "disposisiPersonal") {
      this.component.disposisiPersonal = true;
      this.component.disposisiUnit = false;
    }

    if (to === "disposisiSifat") {
      this.component.disposisiSifat = true;
      this.component.disposisiPersonal = false;
      this.component.disposisiUnit = false;
    }

    if (to === "disposisiPetunjuk") {
      this.component.disposisiPetunjuk = true;
      this.component.disposisiSifat = false;
    }

    if (to === "disposisiTanggal") {
      this.component.disposisiTanggal = true;
      this.component.disposisiPetunjuk = false;
    }
  }

  back(to: string = "root") {
    if (to === "root") {
      this.component.unitOrPersonal = true;
      this.component.disposisiUnit = false;
      this.component.disposisiPersonal = false;
    }

    if (to === "disposisiPersonal" || to === this.selectAs.personal) {
      this.component.disposisiPersonal = true;
      this.component.disposisiSifat = false;
    }

    if (to === "disposisiUnit" || to === this.selectAs.unit) {
      this.component.disposisiUnit = true;
      this.component.disposisiSifat = false;
    }

    if (to === "disposisiSifat") {
      this.component.disposisiSifat = true;
      this.component.disposisiPetunjuk = false;
    }

    if (to === "disposisiPetunjuk") {
      this.component.disposisiPetunjuk = true;
      this.component.disposisiTanggal = false;
    }
  }
}
