import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { NgCalendarModule } from "ionic2-calendar";
import { NotificationPage } from "./notification-page";

@NgModule({
  declarations: [NotificationPage],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    ComponentsModule,
    NgCalendarModule
  ]
})
export class NotificationPageModule {}
