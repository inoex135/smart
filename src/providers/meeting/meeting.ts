import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";


@Injectable()
export class NaskahDisposisiProvider {

    constructor(private api: ApiProvider) {}

    getlist() {
        return this.api.get('/api/rapat?keyword=smart&page=&size=&jenis_waktu=weekend')
    }

}