import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiProvider } from '../api/api';

/*
  Generated class for the SuratProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SuratProvider {

  constructor(public http: Http, public api: ApiProvider) {
    console.log('Hello SuratProvider Provider');
  }
  
  getSumasTemplateExcel() {
    return this.api.get('/surat/sumas/excel/template');
  }

}
