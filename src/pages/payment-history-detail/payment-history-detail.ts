import { Component } from "@angular/core";
import { IonicPage, NavParams } from "ionic-angular";

@Component({
    selector: "payment-history-detail",
    templateUrl: "payment-history-detail.html"
  })
@IonicPage()
export class PaymentHistoryDetailPage {

    static TAG:string = 'PaymentHistoryDetailPage'
    static KEY_MODEL:string = "model"

    labels:any = {
        Gaji_bruto: 'Gaji Bruto',
        Gaji_pot: "Potongan Gaji",
        Kek_bruto: "Kekurangan Bruto",
        Kek_pot: "Kekurangan Potongan",
        UM_bruto: "Uang Makan Bruto",
        UM_pot: "Potongan Uang Makan",
        UL_bruto: "Uang Lembur Bruto",
        UL_pot: "Potongan Uang Lembur",
        Tukin_bruto: "Tukin Bruto",
        Tukin_pot: "Potongan Tukin",
        total: "total",
<<<<<<< HEAD
=======
        Total: "Total",
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
        bulan: "bulan",
        tahun: "tahun",
        monthName: "monthName"
    }

    model:any = {}

    constructor(private navParams: NavParams) {
        this.model = navParams.get(PaymentHistoryDetailPage.KEY_MODEL)
    }

    private getModel(): any {
        var newModel: any = {
            header:{},
            detail: []
        }
        for (var l in this.labels) {
<<<<<<< HEAD
            if (l !== 'total' && l !== 'bulan' && l !== 'monthName' && l !== 'tahun') {
=======
            if (l !== 'total' && l !== 'Total' && l !== 'bulan' && l !== 'monthName' && l !== 'tahun') {
>>>>>>> ae6ba13c1135be994c5d93f7349a0a4370b9e6fd
                newModel.detail.push({label: this.labels[l], value: this.model[l]})
            } else {
                newModel.header[l] = this.model[l]
            }
        }
        return newModel
    }

}