import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { MeetingDelegationPage } from "./meeting-delegation";

@NgModule({
  declarations: [MeetingDelegationPage],
  imports: [
    IonicPageModule.forChild(MeetingDelegationPage),
    ComponentsModule,
    PipesModule
  ]
})
export class MeetingDelegationPageModule {}
