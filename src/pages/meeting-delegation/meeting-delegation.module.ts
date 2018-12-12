import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MeetingDelegationPage } from "./meeting-delegation";
import { AutoCompleteModule } from "ionic2-auto-complete";

@NgModule({
  declarations: [MeetingDelegationPage],
  imports: [
    IonicPageModule.forChild(MeetingDelegationPage),
    AutoCompleteModule
  ],
  exports: [MeetingDelegationPage]
})
export class MeetingDelegationPageModule {}
