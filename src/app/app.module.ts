import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";

import { FileTransfer } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { Calendar } from "@ionic-native/calendar";
import { ChartsModule } from "ng2-charts/charts/charts";
import "../../node_modules/chart.js/dist/Chart.bundle.min.js";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { UserProvider } from "../providers/user/user";
import { ApiProvider } from "../providers/api/api";
import { TokenProvider } from "../providers/token/token";
import { SuratProvider } from "../providers/surat/surat";
import { SuratPageModule } from "../pages/surat/surat.module";
import { AptPageModule } from "../pages/apt/apt.module";
import { PersonalPageModule } from "../pages/personal/personal.module";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [MyApp, HomePage, LoginPage],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuratPageModule,
    AptPageModule,
    PersonalPageModule,
    ChartsModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, LoginPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    ApiProvider,
    TokenProvider,
    FileTransfer,
    File,
    Calendar,
    SuratProvider,
    FileOpener
  ]
})
export class AppModule {}
