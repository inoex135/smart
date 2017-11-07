import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { PipesModule } from "../pipes/pipes.module";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";

import { ComponentsModule } from "../components/components.module";

// 3rd package native
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { File } from "@ionic-native/file";
import { FCM } from "@ionic-native/fcm";
// Custom Directive
import { TextAvatarDirective } from "../directives/text-avatar/text-avatar";
import { RlTagInputModule } from "../directives/angular2-tag-input/tag-input.module";

// 3rd package angular
import { NgCalendarModule } from "ionic2-calendar";
import { Ng2HighchartsModule } from "ng2-highcharts";

// pages
import { PersonalPage } from "../pages/personal/personal";
import { PersonalProvider } from "../providers/personal/personal";
import { AptPage } from "../pages/apt/apt";
import { AptProvider } from "../providers/apt/apt";
import { AptDetailPage } from "../pages/apt-detail/apt-detail";
import { SuratPage } from "../pages/surat/surat";
import { NaskahMasukPage } from "../pages/naskah-masuk/naskah-masuk";
import { NaskahMasukProvider } from "../providers/naskah-masuk/naskah-masuk";
import { NaskahMasukDetailPage } from "../pages/naskah-masuk-detail/naskah-masuk-detail";
import { NaskahNotifikasiPage } from "../pages/naskah-notifikasi/naskah-notifikasi";
import { NaskahNotifikasiProvider } from "../providers/naskah-notifikasi/naskah-notifikasi";
import { NaskahDetailActionPage } from "../pages/naskah-detail-action/naskah-detail-action";

// helper
import { AptHelper } from "../helpers/apt-helper";
import { LoaderHelper } from "../helpers/loader-helper";

// provider
import { UserProvider } from "../providers/user/user";
import { ApiProvider } from "../providers/api/api";
import { TokenProvider } from "../providers/token/token";
import { SuratProvider } from "../providers/surat/surat";
import { EventModalPage } from "../pages/personal/event-modal/event-modal";
import { GrafikSuratProvider } from "../providers/grafik-surat/grafik-surat";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PersonalPage,
    AptPage,
    AptDetailPage,
    SuratPage,
    NaskahMasukPage,
    NaskahMasukDetailPage,
    NaskahDetailActionPage,
    NaskahNotifikasiPage,
    TextAvatarDirective,
    EventModalPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    NgCalendarModule,
    PipesModule,
    RlTagInputModule,
    Ng2HighchartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PersonalPage,
    AptPage,
    AptDetailPage,
    SuratPage,
    NaskahMasukPage,
    NaskahMasukDetailPage,
    NaskahDetailActionPage,
    NaskahNotifikasiPage,
    EventModalPage
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
    SuratProvider,
    FileOpener,
    FCM,
    PersonalProvider,
    AptProvider,
    NaskahMasukProvider,
    NaskahNotifikasiProvider,
    AndroidPermissions,
    AptHelper,
    LoaderHelper,
    GrafikSuratProvider
  ]
})
export class AppModule {}
