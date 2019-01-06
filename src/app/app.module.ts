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

import { ComponentsModule } from "../components/components.module";

// 3rd package native
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { DatePicker } from "@ionic-native/date-picker";
import { FCM } from "@ionic-native/fcm";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { File } from "@ionic-native/file";

// Custom Directive
import { RlTagInputModule } from "../directives/angular2-tag-input/tag-input.module";

// 3rd package angular
import { NgCalendarModule } from "ionic2-calendar";
import { CalendarModule } from "ion2-calendar";

// pages
import { AptDetailActionPage } from "../pages/apt-detail-action/apt-detail-action";

// helper
import { AptHelper } from "../helpers/apt-helper";
import { LoaderHelper } from "../helpers/loader-helper";

// provider
import { ApiProvider } from "../providers/api/api";
import { AptProvider } from "../providers/apt/apt";
import { DatepickerProvider } from "../providers/datepicker/datepicker";
import { GrafikSuratProvider } from "../providers/grafik-surat/grafik-surat";
import { NaskahNotifikasiProvider } from "../providers/naskah-notifikasi/naskah-notifikasi";
import { NaskahMasukProvider } from "../providers/naskah-masuk/naskah-masuk";
import { PersonalAgendaDetailProvider } from "../providers/personal-agenda-detail/personal-agenda-detail";
import { PersonalProvider } from "../providers/personal/personal";
import { SuratProvider } from "../providers/surat/surat";
import { TokenProvider } from "../providers/token/token";
import { UserProvider } from "../providers/user/user";
import { HomeProvider } from "../providers/home/home";
import { HttpClientModule } from "@angular/common/http";
import { NaskahDisposisiProvider } from "../providers/naskah-disposisi/naskah-disposisi";
import { ToastHelper } from "../helpers/toast-helper";
import { MomentHelper } from "../helpers/moment-helper";
import { MasterUnitProvider } from "../providers/master-unit/master-unit";
import { AutoCompleteModule } from "ionic2-auto-complete";
import { CacheProvider } from "../providers/cache/cache";
import { PaymentProvider } from "../providers/payment/payment";
import { MeetingProvider } from "../providers/meeting/meeting";
import { FileHelper } from "../helpers/file-helper";
import { DocumentViewer } from "@ionic-native/document-viewer";

@NgModule({
  declarations: [MyApp, AptDetailActionPage],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    NgCalendarModule,
    PipesModule,
    RlTagInputModule,
    CalendarModule,
    AutoCompleteModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AptDetailActionPage],
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
    GrafikSuratProvider,
    PersonalAgendaDetailProvider,
    DatePicker,
    DatepickerProvider,
    HomeProvider,
    NaskahDisposisiProvider,
    ToastHelper,
    MomentHelper,
    MasterUnitProvider,
    CacheProvider,
    PaymentProvider,
    MeetingProvider,
    FileHelper,
    DocumentViewer
  ]
})
export class AppModule {}
