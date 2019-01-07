import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PipesModule } from "../../pipes/pipes.module";
import { AptDetailPage } from "./apt-detail";

@NgModule({
  declarations: [AptDetailPage],
  imports: [
    IonicPageModule.forChild(AptDetailPage),
    PipesModule
  ]
})
export class AptDetailPageModule {}
