import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { MeetingListPage } from "./meeting-list";

@NgModule({
  declarations: [MeetingListPage],
  imports: [
    IonicPageModule.forChild(MeetingListPage),
    ComponentsModule,
    PipesModule
  ]
})
export class NotificationPageModule {}
