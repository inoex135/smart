import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalAgendaDetailPage } from './personal-agenda-detail';

@NgModule({
  declarations: [
    PersonalAgendaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalAgendaDetailPage),
  ],
})
export class PersonalAgendaDetailPageModule {}
