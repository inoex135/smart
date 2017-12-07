import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PersonalPage } from "./personal";
import { NgCalendarModule } from "ionic2-calendar";

@NgModule({
  declarations: [PersonalPage],
  imports: [
    IonicPageModule.forChild(PersonalPage),
    ComponentsModule,
    NgCalendarModule
  ]
})
export class PersonalPageModule {}
