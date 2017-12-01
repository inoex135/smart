import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalAgendaEditPage } from './personal-agenda-edit';

@NgModule({
  declarations: [
    PersonalAgendaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalAgendaEditPage),
  ],
})
export class PersonalAgendaEditPageModule {}
