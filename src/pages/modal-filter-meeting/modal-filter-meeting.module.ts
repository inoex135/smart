import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalFilterMeetingPage } from './modal-filter-meeting';

@NgModule({
  declarations: [
    ModalFilterMeetingPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalFilterMeetingPage),
  ],
})
export class ModalFilterPageModule {}
