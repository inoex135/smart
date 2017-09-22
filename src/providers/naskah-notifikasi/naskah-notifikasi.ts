import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

/*
  Generated class for the NaskahNotifikasiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NaskahNotifikasiProvider {
  constructor(public http: Http) {
    console.log("Hello NaskahNotifikasiProvider Provider");
  }

  getNotifikasi() {
    const data = [
      {
        date: "4 jam",
        message: "Pesan Naskah Keluar dengan nomor BA-34/KN.5.4/2017",
        sender: "NUGROHO DWI MURIAWAN"
      },
      {
        date: "4 jam",
        message: "Pesan Naskah Keluar dengan nomor BA-34/KN.5.4/2017",
        sender: "NUGROHI DWI MURIAWAN"
      }
    ];

    return data;
  }
}