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
import { PemberitahuanComponent } from "./pemberitahuan/pemberitahuan";
import { TextAvatarDirective } from "../directives/text-avatar/text-avatar";
import { AptVerifikasiComponent } from './apt-verifikasi/apt-verifikasi';

@NgModule({
  declarations: [
    Disposisi,
    LoginLayout1,
    LoginSso,
    PemberitahuanComponent,
    RiwayatComponent,
    Selesai,
    Teruskan,
    TimelineComponent,
    TimelineAgendaComponent,
    TextAvatarDirective,
    AptVerifikasiComponent
  ],
  imports: [IonicModule],
  exports: [
    Disposisi,
    LoginLayout1,
    LoginSso,
    PemberitahuanComponent,
    RiwayatComponent,
    Selesai,
    Teruskan,
    TimelineComponent,
    TimelineAgendaComponent,
    TextAvatarDirective,
    AptVerifikasiComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
