import { Component } from "@angular/core";
import { NaskahMasukProvider } from "../../../providers/naskah-masuk/naskah-masuk";
import { NavParams } from "ionic-angular";
import { TimelineType } from "../../../constant/TimelineType";
import { TimelineDummy } from "../../../dummy/timeline.dummy";

@Component({
  selector: "riwayat-component",
  templateUrl: "riwayat-component.html"
})
export class RiwayatComponent {
  naskah: object = {
    asal_pengirim: "",
    jenis_naskah: "",
    lampiran: "",
    nama_pengirim: "",
    tanggal_naskah: "",
    sifat_naskah: "",
    perihal: "",
    riwayat: [],
    unit_pengirim_naskah: ""
  };

  naskahId: number;
  type: string;

  constructor(
    public naskahProvider: NaskahMasukProvider,
    private navParams: NavParams
  ) {
    this.init();
    this.getRiwayatNaskah(this.naskahId);
  }

  init() {
    this.naskahId = this.navParams.get("naskahId");
    this.type = TimelineType.RIWAYAT;
  }
  getRiwayatNaskah(naskahId: number) {
    this.naskahProvider.riwayatNaskah(naskahId).subscribe(
      res => {
        this.naskah = res;
      },
      err => {}
    );
  }
}
