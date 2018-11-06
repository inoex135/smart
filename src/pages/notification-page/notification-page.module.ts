import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { NotificationPage } from "./notification-page";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [NotificationPage],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    ComponentsModule,
    PipesModule
  ]
})
export class NotificationPageModule {}
