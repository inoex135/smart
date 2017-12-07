import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { NaskahMasukPage } from "./naskah-masuk";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [NaskahMasukPage],
  imports: [
    IonicPageModule.forChild(NaskahMasukPage),
    ComponentsModule,
    PipesModule
  ]
})
export class NaskahMasukPageModule {}
