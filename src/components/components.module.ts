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
import { ChecklistDokumenPendukungComponent } from './checklist-dokumen-pendukung/checklist-dokumen-pendukung';
import { AptStatusPermohonanComponent } from './apt-status-permohonan/apt-status-permohonan';
import { AptPratinjauComponent } from './apt-pratinjau/apt-pratinjau';
import { AptTopLabelComponent } from './apt-top-label/apt-top-label';
import { AptIdentitasPetugasComponent } from './apt-identitas-petugas/apt-identitas-petugas';

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
    AptVerifikasiComponent,
    ChecklistDokumenPendukungComponent,
    AptStatusPermohonanComponent,
    AptPratinjauComponent,
    AptTopLabelComponent,
    AptIdentitasPetugasComponent
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
    AptVerifikasiComponent,
    ChecklistDokumenPendukungComponent,
    AptStatusPermohonanComponent,
    AptPratinjauComponent,
    AptTopLabelComponent,
    AptIdentitasPetugasComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
