import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { PaymentHistoryPage } from "./payment-history";
import { PaymentProvider } from "../../providers/payment/payment";

@NgModule({
  declarations: [PaymentHistoryPage],
  imports: [
    IonicPageModule.forChild(PaymentHistoryPage),
    ComponentsModule,
    PipesModule
  ],
  providers:[PaymentProvider]
})
export class NotificationPageModule {}
