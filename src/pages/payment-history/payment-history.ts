import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { PaymentHistoryDetailPage } from "../payment-history-detail/payment-history-detail";
import { LogUtil } from "../../utils/logutil";
import { PaymentProvider } from "../../providers/payment/payment";

@Component({
    selector: "payment-history",
    templateUrl: "payment-history.html"
  })
@IonicPage()
export class PaymentHistoryPage {

    static TAG:string = 'PaymentHistoryPage'
    static TITLE_INCOME = 'Riwayat Pembayaran'
    static TITLE_NON_INCOME = 'Riwayat Non Pembayaran'


    tabs:any = [
        {
            name: 'Penghasilan',
            isActive: true,
            provider: PaymentProvider.KEY_PAYMENT_INCOME,
            title: PaymentHistoryPage.TITLE_INCOME
        },
        {
            name: 'Non Penghasilan',
            isActive: false,
            provider: PaymentProvider.KEY_PAYMENT_NON_INCOME,
            title: PaymentHistoryPage.TITLE_NON_INCOME
        }
    ]

    items:any = []

    type:string = PaymentProvider.KEY_PAYMENT_INCOME
    title:string = PaymentHistoryPage.TITLE_INCOME

    constructor(private navCtrl: NavController, private payment: PaymentProvider) {
        
    }

    ionViewWillEnter() {
        this.fillList()
    } 

    fillList(): void {
        this.payment.getPaymentsByProvider(this.type)
        .subscribe(res => {
            LogUtil.d(PaymentHistoryPage.TAG, res)
          //  this.items = res
        }) 
    }

    detail(model:any): void {
        if (this.type === PaymentProvider.KEY_PAYMENT_INCOME) {
            var data = {}
            data[PaymentHistoryDetailPage.KEY_MODEL] = model
            this.navCtrl.push(PaymentHistoryDetailPage.TAG, data)
        }
    }

    onTabClick(index:number): void {
        LogUtil.d(PaymentHistoryPage.TAG, "index: " + index)
        this.tabs.forEach((tab, i) => {
          tab.isActive = index == i && !tab.isActive
        })
        let tab = this.tabs[index]
        this.type = tab.provider
        this.title = tab.title
        this.items = []
        this.fillList()
    }

    getItems(): any {
        return this.payment.getTestItems()
    }

    public isIncome(): boolean {
        return this.type === PaymentProvider.KEY_PAYMENT_INCOME
    }

    public isNonIncome(): boolean {
        return this.type === PaymentProvider.KEY_PAYMENT_NON_INCOME
    }

}