import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PersonalAgendaDetailPage } from "./personal-agenda-detail";
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [PersonalAgendaDetailPage],
  imports: [
    IonicPageModule.forChild(PersonalAgendaDetailPage),
    PipesModule,
    ComponentsModule
  ]
})
export class PersonalAgendaDetailPageModule {}
