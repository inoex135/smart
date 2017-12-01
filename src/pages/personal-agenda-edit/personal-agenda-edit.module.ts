import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PersonalAgendaEditPage } from "./personal-agenda-edit";
import { AutoCompleteModule } from "ionic2-auto-complete";
@NgModule({
  declarations: [PersonalAgendaEditPage],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(PersonalAgendaEditPage)
  ]
})
export class PersonalAgendaEditPageModule {}
