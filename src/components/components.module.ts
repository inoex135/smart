import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { LoginLayout1 } from "./login/layout-1/login-layout-1";
import { CobaComponent } from "./coba/coba";
import { IonicModule } from "ionic-angular";

@NgModule({
  declarations: [LoginLayout1, CobaComponent],
  imports: [IonicModule],
  exports: [LoginLayout1, CobaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
