import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LoginSso } from "../login-sso/login-sso";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [LoginSso],
  providers: [InAppBrowser],
  imports: [IonicPageModule.forChild(LoginSso)],
  exports: [LoginSso]
})
export class LoginSsoModule {}
