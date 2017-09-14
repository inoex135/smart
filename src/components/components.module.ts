import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { LoginLayout1 } from "./login/layout-1/login-layout-1";

import { IonicModule } from "ionic-angular";

@NgModule({
  declarations: [LoginLayout1],
  imports: [IonicModule],
  exports: [LoginLayout1],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
