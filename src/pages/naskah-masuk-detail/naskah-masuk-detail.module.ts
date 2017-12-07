import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { NaskahMasukDetailPage } from "./naskah-masuk-detail";

@NgModule({
  declarations: [NaskahMasukDetailPage],
  imports: [IonicPageModule.forChild(NaskahMasukDetailPage), ComponentsModule],
  exports: [NaskahMasukDetailPage]
})
export class NaskahMasukDetailPageModule {}
