import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { LoginLayout1 } from "./login/layout-1/login-layout-1";

import { Teruskan } from "./persuratan/teruskan/teruskan";
import { Selesai } from "./persuratan/selesai/selesai";
import { RiwayatComponent } from "./persuratan/riwayat/riwayat-component";
import { Askrecall } from "./persuratan/askrecall/askrecall";
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
import { AutoCompleteModule } from "ionic2-auto-complete";
import { MasterPegawaiProvider } from "../providers/master-pegawai/master-pegawai";
import { NotificationBell } from "./notification-bell/notification-bell";
import { NotificationProvider } from "../providers/notification/notification";

@NgModule({
  declarations: [
    LoginLayout1,
    PemberitahuanComponent,
    RiwayatComponent,
    Selesai,
    Teruskan,
    Askrecall,
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
    AptIndikatorButtonComponent,
    NotificationBell
  ],
  imports: [IonicModule, PipesModule, AutoCompleteModule],
  exports: [
    LoginLayout1,
    PemberitahuanComponent,
    RiwayatComponent,
    Selesai,
    Teruskan,
    Askrecall,
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
    AptIndikatorButtonComponent,
    NotificationBell
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MasterPegawaiProvider, NotificationProvider]
})
export class ComponentsModule {}
