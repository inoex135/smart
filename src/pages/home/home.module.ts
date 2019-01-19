import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { ComponentsModule } from "../../components/components.module";
import { HomeProvider } from "../../providers/home/home";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage), ComponentsModule],
  providers: [HomeProvider, InAppBrowser],
  exports: [HomePage]
})
export class HomePageModule {}
