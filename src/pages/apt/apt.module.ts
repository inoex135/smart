import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { AptPage } from "./apt";

@NgModule({
  declarations: [AptPage],
  imports: [IonicPageModule.forChild(AptPage), ComponentsModule, PipesModule]
})
export class AptPageModule {}
