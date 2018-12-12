import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { PaymentHistoryDetailPage } from "./payment-history-detail";

@NgModule({
  declarations: [PaymentHistoryDetailPage],
  imports: [
    IonicPageModule.forChild(PaymentHistoryDetailPage),
    ComponentsModule,
    PipesModule
  ]
})
export class NotificationPageModule {}
