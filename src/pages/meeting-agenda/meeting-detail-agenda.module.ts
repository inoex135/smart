import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { MeetingDetailAgendaPage } from "./meeting-detail-agenda";

@NgModule({
  declarations: [MeetingDetailAgendaPage],
  imports: [
    IonicPageModule.forChild(MeetingDetailAgendaPage),
    ComponentsModule,
    PipesModule
  ]
})
export class MeetingDetailAgendaPageModule {}
