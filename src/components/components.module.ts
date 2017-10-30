import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { LoginLayout1 } from "./login/layout-1/login-layout-1";

import { Disposisi } from "./persuratan/disposisi/disposisi";
import { Teruskan } from "./persuratan/teruskan/teruskan";
import { Selesai } from "./persuratan/selesai/selesai";
import { RiwayatComponent } from "./persuratan/riwayat/riwayat-component";
@NgModule({
  declarations: [LoginLayout1, Disposisi, Teruskan, Selesai, RiwayatComponent],
  imports: [IonicModule],
  exports: [LoginLayout1, Disposisi, Teruskan, Selesai, RiwayatComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
