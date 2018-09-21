import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { LoginSso } from "../login-sso/login-sso";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [LoginSso],
  providers: [InAppBrowser],
  imports: [IonicPageModule.forChild(LoginSso), ComponentsModule],
  exports: [LoginSso]
})
export class LoginSsoModule {}
