import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PersonalPage } from "./personal";
import { NgCalendarModule } from "ionic2-calendar";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [PersonalPage],
  imports: [
    IonicPageModule.forChild(PersonalPage),
    ComponentsModule,
    NgCalendarModule,
    PipesModule
  ]
})
export class PersonalPageModule {}
