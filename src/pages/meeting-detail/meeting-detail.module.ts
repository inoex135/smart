import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { MeetingDetailPage } from "./meeting-detail";

@NgModule({
  declarations: [MeetingDetailPage],
  imports: [
    IonicPageModule.forChild(MeetingDetailPage),
    ComponentsModule,
    PipesModule
  ]
})
export class NotificationPageModule {}
