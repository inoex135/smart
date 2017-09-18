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
import { ComponentsModule } from "../components/components.module";
// 3rd package
import { NgCalendarModule } from "ionic2-calendar";
import { PersonalPage } from "../pages/personal/personal";
import { PersonalProvider } from "../providers/personal/personal";
import { AptPage } from "../pages/apt/apt";
import { AptProvider } from "../providers/apt/apt";
import { AptDetailPage } from "../pages/apt-detail/apt-detail";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PersonalPage,
    AptPage,
    AptDetailPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuratPageModule,
    ChartsModule,
    ComponentsModule,
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PersonalPage,
    AptPage,
    AptDetailPage
  ],
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
    FileOpener,
    PersonalProvider,
    AptProvider
  ]
})
export class AppModule {}
