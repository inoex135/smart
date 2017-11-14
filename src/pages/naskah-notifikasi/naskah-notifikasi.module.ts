import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { NaskahNotifikasiPage } from "./naskah-notifikasi";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [NaskahNotifikasiPage],
  imports: [
    IonicPageModule.forChild(NaskahNotifikasiPage),
    ComponentsModule,
    PipesModule
  ]
})
export class NaskahNotifikasiPageModule {}
