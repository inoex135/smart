import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SsoPage } from "./sso";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [SsoPage],
  imports: [IonicPageModule.forChild(SsoPage), ComponentsModule]
})
export class SsoPageModule {}
