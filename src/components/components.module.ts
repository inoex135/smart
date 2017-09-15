import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { LoginLayout1 } from "./login/layout-1/login-layout-1";

import { IonicModule } from "ionic-angular";
import { TabsLayout1 } from "./tabs/layout-1/tabs-layout-1";
import { TabsLayout2 } from "./tabs/layout-2/tabs-layout-2";
import { TabsLayout3 } from "./tabs/layout-3/tabs-layout-3";
import { GoogleCardLayout1 } from "./google-card/google-card-layout-1";

@NgModule({
  declarations: [
    LoginLayout1,
    TabsLayout1,
    TabsLayout2,
    TabsLayout3,
    GoogleCardLayout1
  ],
  imports: [IonicModule],
  exports: [LoginLayout1, GoogleCardLayout1],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
