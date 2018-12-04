import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { CacheProvider } from "../cache/cache";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { TokenProvider } from "../token/token";

@Injectable()
export class PaymentProvider {

    static TAG:string = 'PaymentProvider'
    static KEY_PAYMENT_INCOME = 'income_'
    static KEY_PAYMENT_NON_INCOME = 'non_income_'

    static MONTHS:any = {
        "01": 'Januari',
        "02": 'Februari',
        "03": 'Maret',
        "04": 'April',
        "05": 'Mei',
        "06": 'Juni',
        "07": 'Juli',
        "08": 'Agustus',
        "09": 'September',
        "10": 'Oktober',
        "11": 'November',
        "12": 'Desember'
    }
 
    constructor(public api: ApiProvider, public token: TokenProvider, public cache: CacheProvider) {}

    private getCache(prefix): Promise<any> {
        return this.token.getCurrentProfile()
        .then(data => {
            let key = prefix + data.nip
            return Promise.all([this.cache.get(key), data.nip, key])
        })
    }

    private getIncomes(nip:string): Observable<any>  {
        return this.api.get('http://alika.djkn.or.id/penghasilan/bulanan?code=p0rt4lk3u4ng4n&nip=' + nip)
    }

    private getNonIncomes(nip:string): Observable<any>  {
        return this.api.get('http://alika.djkn.or.id/penghasilan/lainnya?code=p0rt4lk3u4ng4n&nip=' + nip)
    }

    public getPaymentsByProvider(provider:string): Observable<any> {
        return Observable.fromPromise(this.getCache(provider))
            .mergeMap(([data, nip, key]) => {
                if (data == null) {
                    var api = this.getIncomes(nip)
                    if (provider === PaymentProvider.KEY_PAYMENT_NON_INCOME) {
                        api = this.getNonIncomes(nip)
                    }
                    return api
                        .map(response => {
                            var result = []
                            if (provider === PaymentProvider.KEY_PAYMENT_INCOME) {
                                result = this.reconstructArray(response.bulanan)
                            } else {
                                result = response.lainnya.reverse()
                            }
                            if (response.bulanan.length > 0) {
                                this.cache.put(key, {when: Date.now() + CacheProvider.FIVE_MINUTES, response: result})
                            }
                            return result
                        })
                }
                return of(data)
            })
    }

    private reconstructArray(items:any = []): Array<any> {
        if (items.length > 0) {
            items.forEach(model => {
                model['monthName'] = PaymentProvider.MONTHS[model['bulan']]
                model['total'] = (Number(model['Gaji_bruto']) - Number(model['Gaji_pot'])) 
                + (Number(model['Kek_bruto']) - Number(model['Kek_pot'])) 
                + (Number(model['UM_bruto']) - Number(model['UM_pot'])) 
                + (Number(model['UL_bruto']) - Number(model['UL_pot'])) 
                + (Number(model['Tukin_bruto']) - Number(model['Tukin_pot']))
            })
        }
        return items.reverse()
    }

}