import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PersonalAgendaPage } from "./personal-agenda";

@NgModule({
  declarations: [PersonalAgendaPage],
  imports: [IonicPageModule.forChild(PersonalAgendaPage)]
})
export class PersonalAgendaPageModule {}
