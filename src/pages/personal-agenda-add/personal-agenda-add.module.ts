import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalAgendaAddPage } from './personal-agenda-add';

@NgModule({
  declarations: [
    PersonalAgendaAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalAgendaAddPage),
  ],
})
export class PersonalAgendaAddPageModule {}
