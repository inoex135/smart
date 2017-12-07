import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { ComponentsModule } from "../../components/components.module";
import { NaskahDetailActionPage } from "./naskah-detail-action";

@NgModule({
  declarations: [NaskahDetailActionPage],
  imports: [IonicPageModule.forChild(NaskahDetailActionPage), ComponentsModule],
  exports: [NaskahDetailActionPage]
})
export class NaskahDetailActionPageModule {}
