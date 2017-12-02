import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PersonalAgendaEditPage } from "./personal-agenda-edit";
import { AutoCompleteModule } from "ionic2-auto-complete";
import { MasterPegawaiProvider } from "../../providers/master-pegawai/master-pegawai";
import { MasterUnitProvider } from "../../providers/master-unit/master-unit";
@NgModule({
  declarations: [PersonalAgendaEditPage],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(PersonalAgendaEditPage)
  ],
  providers: [MasterPegawaiProvider, MasterUnitProvider]
})
export class PersonalAgendaEditPageModule {}
