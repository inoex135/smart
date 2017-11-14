import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AptNotifikasiPage } from "./apt-notifikasi";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [AptNotifikasiPage],
  imports: [
    IonicPageModule.forChild(AptNotifikasiPage),
    ComponentsModule,
    PipesModule
  ]
})
export class AptNotifikasiPageModule {}
