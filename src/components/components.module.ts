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

import { PemberitahuanComponent } from "./pemberitahuan/pemberitahuan";
import { TextAvatarDirective } from "../directives/text-avatar/text-avatar";
import { AptVerifikasiComponent } from "./apt-verifikasi/apt-verifikasi";
import { ChecklistDokumenPendukungComponent } from "./checklist-dokumen-pendukung/checklist-dokumen-pendukung";
import { AptStatusPermohonanComponent } from "./apt-status-permohonan/apt-status-permohonan";
import { AptPratinjauComponent } from "./apt-pratinjau/apt-pratinjau";
import { AptTopLabelComponent } from "./apt-top-label/apt-top-label";
import { AptIdentitasPetugasComponent } from "./apt-identitas-petugas/apt-identitas-petugas";
import { EmptyStateComponent } from "./empty-state/empty-state";
import { NaskahModalTerimaComponent } from "./naskah-modal-terima/naskah-modal-terima";
import { NaskahModalDownloadComponent } from "./naskah-modal-download/naskah-modal-download";
import { AptIndikatorButtonComponent } from "./apt-indikator-button/apt-indikator-button";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [
    Disposisi,
    LoginLayout1,
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
    AptIdentitasPetugasComponent,
    EmptyStateComponent,
    NaskahModalTerimaComponent,
    NaskahModalDownloadComponent,
    AptIndikatorButtonComponent
  ],
  imports: [IonicModule, PipesModule],
  exports: [
    Disposisi,
    LoginLayout1,
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
    AptIdentitasPetugasComponent,
    EmptyStateComponent,
    NaskahModalTerimaComponent,
    NaskahModalDownloadComponent,
    AptIndikatorButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
