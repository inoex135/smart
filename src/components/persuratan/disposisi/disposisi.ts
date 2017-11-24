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

  show: boolean = false;

  constructor() {
    this.datas.petunjuk = PetunjukDisposisi.getPetunjuk();
    this.datas.jabatan = Jabatan.getJabatan();
    console.log(this.disposisi);
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
      this.disposisi.petunjuk.splice(id, 1);
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

  selectDisposisiAs() {}

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
    console.log(to);
  }

  showComponent() {}
}
