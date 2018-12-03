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

    constructor(public api: ApiProvider, public token: TokenProvider, public cache: CacheProvider) {}

    private getCache(prefix) {
        return this.token.getCurrentProfile()
        .then(data => {
            let key = prefix + data.nip
            return Promise.all([this.cache.get(key), data.nip, key])
        })
    }

    private getIncomes(nip:string) {
        return this.api.get('http://alika.djkn.or.id/penghasilan/bulanan?code=p0rt4lk3u4ng4n&nip=' + nip)
    }

    private getNonIncomes(nip:string) {
        return this.api.get('http://alika.djkn.or.id/penghasilan/lainnya?code=p0rt4lk3u4ng4n&nip=' + nip)
    }

    public getPaymentsByProvider(provider:string) {
        return Observable.fromPromise(this.getCache(provider))
            .mergeMap(([data, nip, key]) => {
                if (data != null) {
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

    public getTotal(model:any) {
        return (model.Gaji_bruto - model.Gaji_pot) 
        + (model.Kek_bruto - model.Kek_Pot) 
        + (model.UM_bruto - model.UM_pot) 
        + (model.UL_bruto - model.UL_pot) 
        + (model.Tukin_bruto - model.Tukin_pot)
    }

    private reconstructArray(items:any = []) {
        if (items.length > 0) {
            items.forEach((element, i) => {
                element['total'] = this.getTotal(element)
            })
        }
        return items.reverse()
    }

}