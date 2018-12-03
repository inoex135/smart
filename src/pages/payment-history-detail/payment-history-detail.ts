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
        Tukin_pot: "Potongan Tukin"
    }

    model:any = {
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
    }

    constructor(private navParams: NavParams) {
        this.model = navParams.get(PaymentHistoryDetailPage.KEY_MODEL)
    }

}