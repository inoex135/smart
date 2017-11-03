import { Component, Input } from "@angular/core";

@Component({
  selector: "riwayat-component",
  templateUrl: "riwayat-component.html"
})
export class RiwayatComponent {
  naskah: object = {
    tanggal: "",
    perihal: "",
    jenis: "",
    asalPengiriman: "",
    sifat: "",
    riwayat: []
  };

  ionViewDidLoad() {}
}
