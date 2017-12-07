import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { AptDetailPage } from "./apt-detail";

@NgModule({
  declarations: [AptDetailPage],
  imports: [
    IonicPageModule.forChild(AptDetailPage),
    ComponentsModule,
    PipesModule
  ]
})
export class AptDetailPageModule {}
