import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { PaymentHistoryDetailPage } from "../payment-history-detail/payment-history-detail";
import { LogUtil } from "../../utils/logutil";
import { PaymentProvider } from "../../providers/payment/payment";
import { ToastHelper } from "../../helpers/toast-helper";
import { LoaderHelper } from "../../helpers/loader-helper";

@Component({
    selector: "payment-history",
    templateUrl: "payment-history.html"
  })
@IonicPage()
export class PaymentHistoryPage {

    static TAG:string = 'PaymentHistoryPage'
    static TITLE_INCOME = 'Riwayat Penghasilan'
    static TITLE_NON_INCOME = 'Riwayat Non Penghasilan'

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

    items: Array<any> = []

    type:string = PaymentProvider.KEY_PAYMENT_INCOME
    title:string = PaymentHistoryPage.TITLE_INCOME

    constructor(private navCtrl: NavController, 
        private payment: PaymentProvider,
        private toast: ToastHelper,
        private loader: LoaderHelper
    ) {
        
    }

    ionViewWillEnter() {
        this.fillList()
    } 

    fillList(): void {
        this.loader.show()
        .then(() => {
            this.payment.getPaymentsByProvider(this.type)
            .subscribe(res => {
                LogUtil.d(PaymentHistoryPage.TAG, res)
                if (res) {
                    this.items = res
                }
                this.loader.dismissLoader()
            }, error => {
                this.toast.present('Oops.. Terjadi kesalahan!')
                this.items = []
                this.loader.dismissLoader()
                this.toast.presentError(error)
            }) 
        })
    }

    detail(model:any): void {
        if (this.type === PaymentProvider.KEY_PAYMENT_INCOME) {
            let data = {}
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
        LogUtil.d(PaymentHistoryPage.TAG, "provider: " + this.type)
        this.title = tab.title
        this.items = []
        this.fillList()
    }

    getItems(): Array<any> {
        return this.items
    }

    public isIncome(): boolean {
        return this.type === PaymentProvider.KEY_PAYMENT_INCOME
    }

    public isNonIncome(): boolean {
        return this.type === PaymentProvider.KEY_PAYMENT_NON_INCOME
    }

    public isIncomeExist() {
        return this.isIncome() && this.isItemExist()
    }

    public isNonIncomeExist() {
        return this.isNonIncome() && this.isItemExist()
    }

    private isItemExist():boolean {
        return this.getItems().length > 0
    }

}