import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AptProvider {
  constructor(public http: Http) {}

  getPermohonanList() {
    const data = [
      {
        id: 1,
        title: "PKN00000000000000",
        image: "assets/images/avatar-small/0.jpg",
        description: "Pengelolaan Kekayaan Negara",
        shortDescription: "Country: Germany",
        longDescription:
          "Penetapan Status Penggunaan Barang Milik Negara Selain Tanah Dan/Atau Bangunan",
        iconLike: "icon-thumb-up",
        iconFavorite: "icon-heart",
        iconShare: "icon-share-variant"
      }
    ];
    return data;
  }
}