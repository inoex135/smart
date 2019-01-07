import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { NotificationPage } from "./notification-page";
import { PipesModule } from "../../pipes/pipes.module";
import { NotificationProvider } from "../../providers/notification/notification";

@NgModule({
  declarations: [NotificationPage],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    ComponentsModule,
    PipesModule
  ],
  providers: [NotificationProvider]
})
export class NotificationPageModule {}
