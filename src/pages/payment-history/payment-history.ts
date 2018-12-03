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

    tabs:any = [
        {
            name: 'Penghasilan',
            isActive: true,
            provider: PaymentProvider.KEY_PAYMENT_INCOME
        },
        {
            name: 'Non Penghasilan',
            isActive: false,
            provider: PaymentProvider.KEY_PAYMENT_NON_INCOME
        }
    ]

    items:any = []

    type:string = PaymentProvider.KEY_PAYMENT_INCOME

    constructor(private navCtrl: NavController, private payment: PaymentProvider) {
        
    }

    ionViewWillEnter() {
        this.fillList()
    } 

    fillList(): void {
        this.payment.getPaymentsByProvider(this.type)
        .subscribe(res => {
            this.items = res
        }) 
    }

    detail(model:any): void {
        if (this.type === PaymentProvider.KEY_PAYMENT_INCOME) {
            var data = {}
            data[PaymentHistoryDetailPage.TAG] = model
            this.navCtrl.push(PaymentHistoryDetailPage.TAG, data)
        }
    }

    onTabClick(index:number): void {
        LogUtil.d(PaymentHistoryPage.TAG, "index: " + index)
        this.tabs.forEach((tab, i) => {
          tab.isActive = index == i && !tab.isActive
        })
        this.type = this.tabs[index].provider
        this.items = []
        this.fillList()
    }

    getItems(): any {
        return this.items
    }

    public isIncome(): boolean {
        return this.type === PaymentProvider.KEY_PAYMENT_INCOME
    }

    public isNonIncome(): boolean {
        return this.type === PaymentProvider.KEY_PAYMENT_NON_INCOME
    }

}