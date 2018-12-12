import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { AptHistoryPage } from "./apt-history";

@NgModule({
  declarations: [AptHistoryPage],
  imports: [
    IonicPageModule.forChild(AptHistoryPage),
    ComponentsModule,
    PipesModule
  ]
})
export class AptHistoryPageModule {}
