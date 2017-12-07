import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { SuratPage } from "./surat";
import { Ng2HighchartsModule } from "ng2-highcharts";

@NgModule({
  declarations: [SuratPage],
  imports: [
    IonicPageModule.forChild(SuratPage),
    ComponentsModule,
    Ng2HighchartsModule
  ]
})
export class SuratPageModule {}
