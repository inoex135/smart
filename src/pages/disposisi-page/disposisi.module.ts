import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";
import { DisposisiPage } from "./disposisi";
import { AutoCompleteModule } from "ionic2-auto-complete";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [DisposisiPage],
    imports: [IonicModule, PipesModule, AutoCompleteModule, IonicPageModule.forChild(DisposisiPage)],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [DisposisiPage]
  })
export class DisposisiPageModule {}
  