import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PersonalAgendaAddPage } from "./personal-agenda-add";
import { AutoCompleteModule } from "ionic2-auto-complete";
import { MomentHelper } from "../../helpers/moment-helper";
import { MasterPegawaiProvider } from "../../providers/master-pegawai/master-pegawai";
import { MasterUnitProvider } from "../../providers/master-unit/master-unit";

@NgModule({
  declarations: [PersonalAgendaAddPage],
  imports: [
    IonicPageModule.forChild(PersonalAgendaAddPage),
    AutoCompleteModule
  ],
  providers: [MomentHelper, MasterPegawaiProvider, MasterUnitProvider]
})
export class PersonalAgendaAddPageModule {}
