import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";

import { FileTransfer } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from "../pages/login/login.module";
import { UserProvider } from '../providers/user/user';
import { ApiProvider } from '../providers/api/api';
import { TokenProvider } from '../providers/token/token';
import { SuratProvider } from '../providers/surat/surat';

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
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
    FileOpener
  ]
})
export class AppModule {}
