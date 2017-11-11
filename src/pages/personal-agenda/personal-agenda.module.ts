import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PersonalAgendaPage } from "./personal-agenda";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [PersonalAgendaPage],
  imports: [IonicPageModule.forChild(PersonalAgendaPage), ComponentsModule]
})
export class PersonalAgendaPageModule {}
