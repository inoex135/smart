import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";
import { CacheProvider } from "../cache/cache";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { TokenProvider } from "../token/token";
import { LogUtil } from "../../utils/logutil";

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

    static TEST:Array<any> = [
        {
            "bulan": "01",
            "tahun": "2018",
            "Gaji_bruto": "6104030",
            "Gaji_pot": "465430",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "738000",
            "UM_pot": "110700",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "29529416",
            "Tukin_pot": "3709416"
            },
            {
            "bulan": "02",
            "tahun": "2018",
            "Gaji_bruto": "6104030",
            "Gaji_pot": "465430",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "574000",
            "UM_pot": "86100",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "29464875",
            "Tukin_pot": "3903075"
            },
            {
            "bulan": "03",
            "tahun": "2018",
            "Gaji_bruto": "6247471",
            "Gaji_pot": "479771",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "861000",
            "UM_pot": "129150",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "29368041",
            "Tukin_pot": "4193541"
            },
            {
            "bulan": "04",
            "tahun": "2018",
            "Gaji_bruto": "6247471",
            "Gaji_pot": "479771",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "656000",
            "UM_pot": "98400",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "29556229",
            "Tukin_pot": "3736229"
            },
            {
            "bulan": "05",
            "tahun": "2018",
            "Gaji_bruto": "12315421",
            "Gaji_pot": "589921",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "738000",
            "UM_pot": "110700",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "115971623",
            "Tukin_pot": "16952703"
            },
            {
            "bulan": "06",
            "tahun": "2018",
            "Gaji_bruto": "12315421",
            "Gaji_pot": "589921",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "205000",
            "UM_pot": "30750",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "46304729",
            "Tukin_pot": "8114729"
            },
            {
            "bulan": "07",
            "tahun": "2018",
            "Gaji_bruto": "6247471",
            "Gaji_pot": "479771",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "615000",
            "UM_pot": "92250",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "46240187",
            "Tukin_pot": "8308387"
            },
            {
            "bulan": "08",
            "tahun": "2018",
            "Gaji_bruto": "6247471",
            "Gaji_pot": "479771",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "492000",
            "UM_pot": "73800",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "29556229",
            "Tukin_pot": "3736229"
            },
            {
            "bulan": "09",
            "tahun": "2018",
            "Gaji_bruto": "6247471",
            "Gaji_pot": "479771",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "738000",
            "UM_pot": "110700",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "29491687",
            "Tukin_pot": "3929887"
            },
            {
            "bulan": "10",
            "tahun": "2018",
            "Gaji_bruto": "6247471",
            "Gaji_pot": "479771",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "902000",
            "UM_pot": "135300",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "29261342",
            "Tukin_pot": "5377842"
            },
            {
            "bulan": "11",
            "tahun": "2018",
            "Gaji_bruto": "6247471",
            "Gaji_pot": "479771",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "0",
            "UM_pot": "0",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "29745467",
            "Tukin_pot": "3925467"
            },
            {
            "bulan": "12",
            "tahun": "2018",
            "Gaji_bruto": "0",
            "Gaji_pot": "0",
            "Kek_bruto": "0",
            "Kek_pot": "0",
            "UM_bruto": "0",
            "UM_pot": "0",
            "UL_bruto": "0",
            "UL_pot": "0",
            "Tukin_bruto": "29745467",
            "Tukin_pot": "3925467"
            }
    ]

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
                if (data != null) {
                    var api = this.getIncomes(nip)
                    if (provider === PaymentProvider.KEY_PAYMENT_NON_INCOME) {
                        api = this.getNonIncomes(nip)
                    }
                    return api
                        .map(response => {
                            var result = []
                            if (provider === PaymentProvider.KEY_PAYMENT_INCOME) {
                                result = PaymentProvider.TEST.reverse()
                               // result = this.reconstructArray(response.bulanan)
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
                LogUtil.d(PaymentProvider.TAG, model.bulan)
                model['total'] = (Number(model['Gaji_bruto']) - Number(model['Gaji_pot'])) 
                + (Number(model['Kek_bruto']) - Number(model['Kek_pot'])) 
                + (Number(model['UM_bruto']) - Number(model['UM_pot'])) 
                + (Number(model['UL_bruto']) - Number(model['UL_pot'])) 
                + (Number(model['Tukin_bruto']) - Number(model['Tukin_pot']))
            })
        }
        return items.reverse()
    }

    public getTestItems(): Array<any> {
        var arr = this.reconstructArray(PaymentProvider.TEST)
        LogUtil.d(PaymentProvider.TAG, arr)
        return arr
    }

}