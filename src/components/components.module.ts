import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { LoginLayout1 } from "./login/layout-1/login-layout-1";

import { Disposisi } from "./persuratan/disposisi/disposisi";
import { Teruskan } from "./persuratan/teruskan/teruskan";
import { Selesai } from "./persuratan/selesai/selesai";
import { RiwayatComponent } from "./persuratan/riwayat/riwayat-component";
import {
  TimelineComponent,
  TimelineAgendaComponent
} from "./timeline/timeline";
import { LoginSso } from "./login/sso/login-sso";
import { PemberitahuanComponent } from './pemberitahuan/pemberitahuan';

@NgModule({
  declarations: [
    LoginLayout1,
    LoginSso,
    Disposisi,
    Teruskan,
    Selesai,
    RiwayatComponent,
    TimelineComponent,
    TimelineAgendaComponent,
    PemberitahuanComponent
  ],
  imports: [IonicModule],
  exports: [
    LoginLayout1,
    LoginSso,
    Disposisi,
    Teruskan,
    Selesai,
    RiwayatComponent,
    TimelineComponent,
    TimelineAgendaComponent,
    PemberitahuanComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
