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
        date: "2017-10-09T23:20:10+00:00",
        message: "Pesan Naskah Keluar dengan nomor BA-34/KN.5.4/2017",
        sender: "NUGROHO DWI MURIAWAN",
        color: "red"
      },
      {
        date: "2017-10-01T23:20:10+00:00",
        message: "Pesan Naskah Keluar dengan nomor BA-34/KN.5.4/2017",
        sender: "NUGROHI DWI MURIAWAN",
        color: "red"
      }
    ];

    return data;
  }
}
